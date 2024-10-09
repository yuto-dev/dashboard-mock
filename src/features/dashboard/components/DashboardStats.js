function DashboardStats({title, icon, value, description, colorIndex}){

    const COLORS = ["black", "black"]

    const getDescStyle = () => {
        if(description.includes("↗︎"))return "font-bold text-green-700 dark:text-green-300"
        else if(description.includes("↙"))return "font-bold text-rose-500 dark:text-red-400"
        else return ""
    }

    return(
        <div className="stats shadow">
            <div className="stat">
                <div className={`stat-figure dark:text-slate-300 text-${COLORS[colorIndex%2]}`}>{icon}</div>
                <div className={`stat-value text-2xl dark:text-slate-300 text-${COLORS[colorIndex%2]}`}>{title}</div>
                <div className={`stat-value dark:text-slate-300 text-${COLORS[colorIndex%2]}`}>{value}</div>
                <div className={"stat-desc mt-2 " + getDescStyle()}>{description}</div>
            </div>
        </div>
    )
}

export default DashboardStats;
