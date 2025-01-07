const TIMELINE_LENGTH = 72;
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
    const hours = arrayRange(1, TIMELINE_LENGTH, 1)
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

function Tasks({ csv }) {
    const assignments = csv.trim().split('\n').map(line => line.trim())
        .map(line => line.split(","))
        .map(cells => new Assignment(cells[0], cells[1], cells[2], cells[3]))
        .map(assignment => {
            return (
                <Task id={assignment.taskId} estimatedHours={assignment.estimatedHours}
                    startHour={assignment.startHour} finishHour={assignment.finishHour}
                    key={"task-" + assignment.taskId} />
            )
        });
    return (
        <>
            {assignments}
        </>
    )

}

class Assignment {
    constructor(taskId, estimatedHours, startHour, finishHour) {
        this.taskId = taskId;
        this.estimatedHours = estimatedHours;
        this.startHour = startHour;
        this.finishHour = finishHour;
    }
}

const e_0_1=`
1,4,8,12
3,2,34,36
`;
const e_0_2=`
2,10,8,34
`;
const e_1_1=`
1,4,8,12
3,2,56,58
`;
const e_1_2=`
2,10,16,42
`;
const e_2_1=`
1,4,8,12
2,10,13,39
3,2,39,41
`;
const e_2_2=`
`;


function Timeline({ e1, e2, s1, f1, s2, f2 }) {
    const timelabels = arrayRange(1, TIMELINE_LENGTH, 1)
        .map(hour => {
            return <TimeLabel hour={hour} key={hour} />
        });
    return (
        <div className="timeline">
            <div className="board-row" key="timelabels">
                {timelabels}
            </div>
            <div className="board-row" key="employee-1">
                <Hours startWork={s1} finishWork={f1} />
                <Tasks csv={e1} />
            </div>
            <div className="board-row" key="employee-2">
                <Hours startWork={s2} finishWork={f2} />
                <Tasks csv={e2} />
            </div>
        </div>
    );
}

export default function Simulation() {
    return (
        <>
            <Timeline e1={e_0_1} e2={e_0_2} s1={8} f1={17} s2={8} f2={17} key="tl0" />
            <Timeline e1={e_1_1} e2={e_1_2} s1={8} f1={17} s2={16} f2={25} key="tl1" />
            <Timeline e1={e_2_1} e2={e_2_2} s1={8} f1={17} s2={16} f2={25} key="tl2" />
        </>
    )
}

const arrayRange = (start, stop, step) =>
    Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
    );