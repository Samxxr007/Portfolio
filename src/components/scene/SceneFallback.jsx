const codeRows = [
    ["signal", 43], ["light", 76], ["muted", 63], ["light", 88], ["muted", 52], ["signal", 37], ["light", 69],
];

export default function SceneFallback({ className = "" }) {
    return (
        <div className={`scene-fallback relative w-full h-full flex items-center justify-center overflow-hidden ${className}`} role="img" aria-label="Three-dimensional laptop showing code, surrounded by an orange systems orbit">
            <div className="scene-fallback__halo" aria-hidden="true" />
            <div className="scene-fallback__orbit" aria-hidden="true">
                <span /><span /><span />
            </div>
            <div className="scene-fallback__artifact">
                <div className="scene-fallback__screen">
                    <div className="scene-fallback__screen-bar">
                        <span /><span /><span />
                        <small>WORKSPACE / 001</small>
                    </div>
                    <div className="scene-fallback__code" aria-hidden="true">
                        {codeRows.map(([tone, width], index) => (
                            <span key={index} className={`scene-fallback__code-line scene-fallback__code-line--${tone}`} style={{ width: `${width}%`, marginLeft: index % 3 === 1 ? "8%" : "0" }} />
                        ))}
                    </div>
                    <div className="scene-fallback__screen-foot"><span>INTERFACE</span><span>LOGIC</span><b>DATA ↗</b></div>
                </div>
                <div className="scene-fallback__deck">
                    <div className="scene-fallback__keys" aria-hidden="true">
                        {Array.from({ length: 44 }, (_, index) => <span key={index} />)}
                    </div>
                    <div className="scene-fallback__trackpad" />
                    <span className="scene-fallback__signal" />
                </div>
            </div>
            <div className="scene-fallback__annotation scene-fallback__annotation--left">PRODUCT<br />ENGINEERING</div>
            <div className="scene-fallback__annotation scene-fallback__annotation--right">UI / API / AI<br /><b>ONE SYSTEM</b></div>
        </div>
    );
}
