import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function OrbitalCore({ reducedMotion = false, scrollProgressRef }) {
    const groupRef = useRef(null);
    const targetRotation = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (reducedMotion) return;

        const handlePointerMove = (e) => {
            const normX = (e.clientX / window.innerWidth) * 2 - 1;
            const normY = -(e.clientY / window.innerHeight) * 2 + 1;
            // Clamped, elegant tilt: max ~14 degrees
            targetRotation.current.y = normX * 0.24;
            targetRotation.current.x = -normY * 0.16;
        };

        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        return () => window.removeEventListener("pointermove", handlePointerMove);
    }, [reducedMotion]);

    // High-craft editorial physical materials
    const materials = useMemo(() => {
        return {
            // 1. Warm Architectural Stone / Travertine Monolith
            stone: new THREE.MeshStandardMaterial({
                color: "#E0DAD0",
                roughness: 0.84,
                metalness: 0.04,
            }),
            // 2. Satin Graphite / Basalt Interlocking Block
            satinGraphite: new THREE.MeshStandardMaterial({
                color: "#22252A",
                roughness: 0.42,
                metalness: 0.65,
            }),
            // 3. Brushed Metal Precision Shaft
            brushedMetal: new THREE.MeshStandardMaterial({
                color: "#D5D1C9",
                roughness: 0.28,
                metalness: 0.85,
            }),
            // 4. Signature Signal Orange Continuous Lacquer Ribbon
            signalOrange: new THREE.MeshStandardMaterial({
                color: "#FF4F2B",
                roughness: 0.22,
                metalness: 0.28,
            })
        };
    }, []);

    // Create the continuous sculpted Signal Orange ribbon geometry
    const ribbonGeometry = useMemo(() => {
        // Intentionally composed 3D spline points weaving through the architecture
        const points = [
            new THREE.Vector3(0.08, 1.48, 0.32),   // Arching summit front-right
            new THREE.Vector3(0.88, 0.98, 0.52),   // Sweeping down the upper facade
            new THREE.Vector3(1.18, 0.12, 0.18),   // Flanking the cantilever block
            new THREE.Vector3(0.72, -0.72, -0.32), // Diving behind the mid pillar
            new THREE.Vector3(0.02, -1.38, -0.18), // Curving beneath the stone base
            new THREE.Vector3(-0.72, -1.02, 0.32), // Wrapping forward at lower left
            new THREE.Vector3(-1.08, -0.12, 0.46), // Cresting outward on the left flank
            new THREE.Vector3(-0.62, 0.76, 0.08),  // Ascending through the architectural notch
            new THREE.Vector3(-0.22, 1.32, -0.26)  // Returning behind the top crest
        ];
        const curve = new THREE.CatmullRomCurve3(points, true, "centripetal", 0.55);
        return new THREE.TubeGeometry(curve, 140, 0.108, 20, true);
    }, []);

    // Clean up memory on unmount
    useEffect(() => {
        return () => {
            ribbonGeometry.dispose();
            Object.values(materials).forEach((m) => m.dispose());
        };
    }, [materials, ribbonGeometry]);

    useFrame((_, delta) => {
        if (!groupRef.current) return;

        if (reducedMotion) {
            groupRef.current.rotation.x = 0.12;
            groupRef.current.rotation.y = -0.32;
            return;
        }

        // Additional scroll-driven revolution around Y
        const scrollOffset = scrollProgressRef?.current ? scrollProgressRef.current * Math.PI * 1.8 : 0;
        const desiredY = targetRotation.current.y + scrollOffset;

        // Damped pointer & scroll follow (subtle, weighty architectural movement)
        const lerpFactor = Math.min(delta * 2.8, 0.1);
        groupRef.current.rotation.y += (desiredY - groupRef.current.rotation.y) * lerpFactor;
        groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * lerpFactor;

        // Subtle architectural breathing float
        groupRef.current.position.y = Math.sin(Date.now() * 0.0009) * 0.045;
    });

    return (
        <group ref={groupRef} position={[0, 0, 0]} scale={[1.22, 1.22, 1.22]}>
            {/* 1. Asymmetrical Central Architectural Monolith (Travertine) */}
            <mesh
                material={materials.stone}
                position={[-0.15, 0.05, -0.05]}
                castShadow
                receiveShadow
            >
                <boxGeometry args={[0.9, 2.5, 0.72]} />
            </mesh>

            {/* 2. Interlocking Cantilever Block (Satin Graphite) */}
            <mesh
                material={materials.satinGraphite}
                position={[0.2, 0.38, 0.02]}
                castShadow
                receiveShadow
            >
                <boxGeometry args={[1.25, 0.44, 0.94]} />
            </mesh>

            {/* 3. Inset Vertical Structural Plate (Basalt) */}
            <mesh
                material={materials.satinGraphite}
                position={[-0.15, -0.58, 0.34]}
            >
                <boxGeometry args={[0.72, 0.95, 0.1]} />
            </mesh>

            {/* 4. Brushed Metal Structural Pin / Joint */}
            <mesh
                material={materials.brushedMetal}
                position={[-0.42, 0.38, 0.28]}
                rotation={[0, 0, Math.PI / 2]}
            >
                <cylinderGeometry args={[0.08, 0.08, 0.55, 20]} />
            </mesh>

            {/* 5. The Sculptural Signal Orange Continuous Ribbon */}
            <mesh
                geometry={ribbonGeometry}
                material={materials.signalOrange}
                castShadow
            />
        </group>
    );
}
