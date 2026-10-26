import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A sculptural laptop / systems artifact: software is the work, the signal ring
 * represents connected services, and the little nodes represent active systems.
 */
export default function OrbitalCore({ reducedMotion = false, scrollProgressRef }) {
    const groupRef = useRef(null);
    const pointerTarget = useRef({ x: 0, y: -0.12 });

    useEffect(() => {
        if (reducedMotion) return undefined;

        const handlePointerMove = (event) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = (event.clientY / window.innerHeight) * 2 - 1;
            pointerTarget.current.y = x * 0.16;
            pointerTarget.current.x = y * 0.08;
        };

        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        return () => window.removeEventListener("pointermove", handlePointerMove);
    }, [reducedMotion]);

    const materials = useMemo(() => ({
        shell: new THREE.MeshStandardMaterial({ color: "#C8C3B9", roughness: 0.35, metalness: 0.48 }),
        bezel: new THREE.MeshStandardMaterial({ color: "#20211F", roughness: 0.32, metalness: 0.25 }),
        display: new THREE.MeshStandardMaterial({ color: "#111412", roughness: 0.28, metalness: 0.12, emissive: "#080B09", emissiveIntensity: 0.4 }),
        keybed: new THREE.MeshStandardMaterial({ color: "#30312E", roughness: 0.6, metalness: 0.2 }),
        key: new THREE.MeshStandardMaterial({ color: "#9F9B92", roughness: 0.55, metalness: 0.28 }),
        code: new THREE.MeshStandardMaterial({ color: "#F5F1E8", roughness: 0.45, emissive: "#77736A", emissiveIntensity: 0.12 }),
        codeMuted: new THREE.MeshStandardMaterial({ color: "#777C71", roughness: 0.5 }),
        signal: new THREE.MeshStandardMaterial({ color: "#FF4F2B", roughness: 0.22, metalness: 0.35, emissive: "#6D1605", emissiveIntensity: 0.28 }),
        node: new THREE.MeshStandardMaterial({ color: "#F5F1E8", roughness: 0.26, metalness: 0.25, emissive: "#F5F1E8", emissiveIntensity: 0.12 }),
    }), []);

    const keyPositions = useMemo(() => {
        const positions = [];
        for (let row = 0; row < 4; row += 1) {
            const cols = row === 3 ? 8 : 11;
            for (let col = 0; col < cols; col += 1) {
                const spacing = 1.82 / (cols - 1);
                positions.push({
                    key: `${row}-${col}`,
                    x: (col - (cols - 1) / 2) * spacing,
                    z: 0.10 + row * 0.18,
                    width: row === 3 ? 0.13 : 0.105,
                });
            }
        }
        return positions;
    }, []);

    const codeLines = useMemo(() => ([
        { x: -0.76, y: 0.72, w: 0.66, material: "signal" },
        { x: -0.53, y: 0.51, w: 1.08, material: "code" },
        { x: -0.60, y: 0.31, w: 0.92, material: "muted" },
        { x: -0.51, y: 0.11, w: 0.80, material: "code" },
        { x: -0.58, y: -0.09, w: 1.03, material: "muted" },
        { x: -0.70, y: -0.29, w: 0.56, material: "signal" },
        { x: -0.48, y: -0.49, w: 0.88, material: "code" },
    ]), []);

    const orbitGeometry = useMemo(() => {
        const points = [
            new THREE.Vector3(-1.65, -0.48, 0.25),
            new THREE.Vector3(-1.56, 0.74, -0.45),
            new THREE.Vector3(-0.76, 1.58, -0.6),
            new THREE.Vector3(0.42, 1.74, -0.35),
            new THREE.Vector3(1.48, 1.02, 0.05),
            new THREE.Vector3(1.7, -0.26, 0.42),
            new THREE.Vector3(0.94, -1.28, 0.55),
            new THREE.Vector3(-0.28, -1.58, 0.28),
            new THREE.Vector3(-1.34, -1.08, -0.12),
        ];
        const curve = new THREE.CatmullRomCurve3(points, true, "centripetal", 0.5);
        return new THREE.TubeGeometry(curve, 180, 0.035, 10, true);
    }, []);

    useEffect(() => () => {
        orbitGeometry.dispose();
        Object.values(materials).forEach((material) => material.dispose());
    }, [materials, orbitGeometry]);

    useFrame((state, delta) => {
        const group = groupRef.current;
        if (!group) return;

        if (reducedMotion) {
            group.rotation.set(0.06, -0.16, 0);
            group.position.y = 0;
            return;
        }

        // The same scroll progress that moves the hero type gently turns the
        // whole artifact. Exponential damping avoids the visible frame-by-frame lag.
        const progress = Math.max(0, Math.min(1, scrollProgressRef?.current ?? 0));
        const targetY = pointerTarget.current.y + progress * Math.PI * 1.12;
        const damping = 1 - Math.exp(-5.5 * delta);
        group.rotation.y += (targetY - group.rotation.y) * damping;
        group.rotation.x += (pointerTarget.current.x - group.rotation.x) * damping;
        group.rotation.z += (0 - group.rotation.z) * damping;
        group.position.y = Math.sin(state.clock.elapsedTime * 0.68) * 0.025;
    });

    const lineMaterial = (name) => {
        if (name === "signal") return materials.signal;
        if (name === "muted") return materials.codeMuted;
        return materials.code;
    };

    return (
        <group ref={groupRef} position={[0, 0, 0]} scale={[1.12, 1.12, 1.12]}>
            {/* Screen shell and inset display */}
            <mesh material={materials.bezel} position={[0, 0.24, -0.08]} castShadow receiveShadow>
                <boxGeometry args={[2.28, 1.58, 0.12]} />
            </mesh>
            <mesh material={materials.display} position={[0, 0.24, -0.013]}>
                <boxGeometry args={[2.12, 1.42, 0.018]} />
            </mesh>

            {/* Minimal code lines: a symbolic glimpse of the system being built */}
            {codeLines.map((line) => (
                <mesh key={line.y} material={lineMaterial(line.material)} position={[line.x + line.w / 2, line.y, 0.002]}>
                    <boxGeometry args={[line.w, 0.035, 0.012]} />
                </mesh>
            ))}
            {[0, 1, 2].map((dot) => (
                <mesh key={dot} material={dot === 0 ? materials.signal : materials.codeMuted} position={[-0.93 + dot * 0.12, 0.83, 0.002]}>
                    <sphereGeometry args={[0.026, 12, 12]} />
                </mesh>
            ))}
            <mesh material={materials.key} position={[0, 0.83, 0.002]}>
                <boxGeometry args={[0.46, 0.024, 0.012]} />
            </mesh>

            {/* Lower chassis, keyboard deck, and trackpad */}
            <mesh material={materials.shell} position={[0, -0.58, 0.45]} rotation={[-0.04, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[2.52, 0.14, 1.48]} />
            </mesh>
            <mesh material={materials.keybed} position={[0, -0.497, 0.31]}>
                <boxGeometry args={[2.05, 0.02, 0.76]} />
            </mesh>
            {keyPositions.map((key) => (
                <mesh key={key.key} material={materials.key} position={[key.x, -0.482, key.z]}>
                    <boxGeometry args={[key.width, 0.018, 0.09]} />
                </mesh>
            ))}
            <mesh material={materials.bezel} position={[0, -0.493, 0.83]}>
                <boxGeometry args={[0.58, 0.018, 0.32]} />
            </mesh>
            <mesh material={materials.signal} position={[0, -0.501, -0.18]}>
                <boxGeometry args={[0.62, 0.016, 0.04]} />
            </mesh>

            {/* The continuous orange route ties the separate pieces into one system */}
            <mesh geometry={orbitGeometry} material={materials.signal} castShadow />
            {[[-1.48, 0.74, -0.4], [1.52, 0.86, 0.05], [0.92, -1.22, 0.5]].map((point, index) => (
                <group key={index} position={point}>
                    <mesh material={materials.node}>
                        <sphereGeometry args={[0.075, 20, 20]} />
                    </mesh>
                    <mesh material={materials.signal} position={[0, 0, 0.06]}>
                        <sphereGeometry args={[0.025, 12, 12]} />
                    </mesh>
                </group>
            ))}
        </group>
    );
}
