import IconGlobe from './Icon/IconGlobe';

interface MarkerStatProps {
    label: string;
    count: number;
    percentage: number;
}

const MarkerStat: React.FC<MarkerStatProps> = ({ label, count, percentage }) => (
    <div className="flex items-center">
        <div className="w-9 h-9">
            <div className="bg-primary/10 text-primary rounded-xl w-9 h-9 flex justify-center items-center dark:text-white-light">
                <IconGlobe className="w-5 h-5" />
            </div>
        </div>
        <div className="px-3 flex-initial w-full">
            <div className="w-summary-info flex justify-between font-semibold text-white-dark mb-1">
                <h6>
                    {label} ({count})
                </h6>
                <p className="ltr:ml-auto rtl:mr-auto text-xs">{percentage}%</p>
            </div>
            <div className="w-full rounded-full h-5 p-1 bg-dark-light overflow-hidden shadow-3xl dark:bg-dark-light/10 dark:shadow-none">
                <div
                    className="bg-gradient-to-r from-[#009ffd] to-[#2a2a72] w-full h-full rounded-full relative before:absolute before:inset-y-0 ltr:before:right-0.5 rtl:before:left-0.5 before:bg-white before:w-2 before:h-2 before:rounded-full before:m-auto"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    </div>
);

interface AnalyticsProps {
    markers: MarkerProps[];
}
const Analytics: React.FC<AnalyticsProps> = ({ markers }) => {
    const totalMarkers = markers.length;

    const labelCounts = markers.reduce((acc, marker) => {
        const label = marker.label || 'Unknown';
        acc[label] = (acc[label] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="flex flex-col space-y-5">
            {Object.entries(labelCounts).map(([label, count]) => (
                <MarkerStat key={label} label={label} count={count} percentage={Math.round((count / totalMarkers) * 100)} />
            ))}
        </div>
    );
};

export default Analytics;
