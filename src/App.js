function Hour({ enabled }) {
    const className = enabled ? "hour hour-enabled" : "hour";
    return (<div className={className}></div>);
}

function TimeLabel({ hour }) {
    return (<div className="timelabel">{hour}h</div>);
}

function Hours({ startWork, finishWork }) {
    const startLunch = startWork + 4;
    const finishLunch = startLunch + 1;
    const hours = arrayRange(1, 72, 1)
        .map(hour => {
            const dayHour = hour % 24;
            return (
                <>
                    <Hour enabled={dayHour >= startWork && dayHour < startLunch
                        || dayHour >= finishLunch && dayHour < finishWork
                        || finishWork > 24 && (dayHour + 24) < finishWork} />
                </>
            )
        });
    return (
        <>
            {hours}
        </>
    )
}

export default function Timeline() {
    const timelabels = arrayRange(1, 72, 1)
        .map(hour => {
            return (
                <>
                    <TimeLabel hour={hour} />
                </>
            )
        });
    return (
        <div className="timeline">
            <div className="board-row">
                {timelabels}
            </div>
            <div className="board-row">
                <Hours startWork={9} finishWork={18} />
            </div>
            <div className="board-row">
                <Hours startWork={16} finishWork={25} />
            </div>
        </div>
    );
}

const arrayRange = (start, stop, step) =>
    Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
    );