function Hour({ enabled }) {
    const className = enabled ? "hour hour-enabled" : "hour";
    return (<div className={className}></div>);
}

function TimeLabel({ hour }) {
    return (<div className="timelabel" key={hour}>{hour}h</div>);
}

function Hours({ startWork, finishWork }) {
    const startLunch = startWork + 4;
    const finishLunch = startLunch + 1;
    const hours = arrayRange(1, 48, 1)
        .map(hour => {
            const dayHour = hour % 24;
            let isWorkHour = dayHour >= startWork && dayHour < startLunch
                || dayHour >= finishLunch && dayHour < finishWork
                || finishWork > 24 && (dayHour + 24) < finishWork;
            return <Hour enabled={isWorkHour} key={"hour-" + hour} />
        });
    return (
        <>
            {hours}
        </>
    )
}

function Task({ id, estimatedHours, startHour, finishHour }) {
    const style = {
        width: (33 * (finishHour - startHour)) + "px",
        left: (33 * startHour - 12) + "px",
    }
    return (
        <div className="task" style={style}>
            <span className="task-id">#{id}</span> ({estimatedHours}h)
        </div>
    )
}

export default function Timeline() {
    const timelabels = arrayRange(1, 48, 1)
        .map(hour => {
            return <TimeLabel hour={hour} key={hour} />
        });
    return (
        <div className="timeline">
            <div className="board-row" key="timelabels">
                {timelabels}
            </div>
            <div className="board-row" key="employee-1">
                <Hours startWork={9} finishWork={18} />
                <Task id={0} estimatedHours={8} startHour={9} finishHour={12}/>
            </div>
            <div className="board-row" key="employee-2">
                <Hours startWork={16} finishWork={25} />
                <Task id={1} estimatedHours={7} startHour={16} finishHour={17} />
            </div>
        </div>
    );
}

const arrayRange = (start, stop, step) =>
    Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
    );