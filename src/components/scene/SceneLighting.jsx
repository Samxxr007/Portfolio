export default function SceneLighting() {
    return (
        <>
            {/* Soft Warm Ambient Fill calibrated for Ivory ground */}
            <ambientLight intensity={1.0} color="#F5F1E8" />

            {/* Studio Key Directional Light with soft crispness */}
            <directionalLight
                position={[5, 8, 5]}
                intensity={2.2}
                color="#FFFFFF"
            />

            {/* Soft Warm Ground/Fill Light */}
            <directionalLight
                position={[-4, -2, 3]}
                intensity={0.7}
                color="#EDE7DC"
            />

            {/* Subtle Signature Rim Light highlighting sculpture contours */}
            <pointLight
                position={[-3, 2.5, -2]}
                intensity={2.2}
                distance={12}
                decay={2}
                color="#FF4F2B"
            />

            {/* Front Specular Highlight Light */}
            <directionalLight
                position={[0, 4, 6]}
                intensity={0.6}
                color="#FFFFFF"
            />
        </>
    );
}
