import { getDashboardStats } from '@/app/services/stats/dashboardStats';
import { getRecentReassignments } from '@/app/services/stats/getRecentReassignments';
import { reassignmentTasksFunction } from '@/app/services/stats/reassignmentTasks';
import DashboardStats from '@/components/modules/dashboard/DashboardStats';
import ReassignHistory from '@/components/modules/dashboard/ReassignHistory';
import ReassignSection from '@/components/modules/dashboard/ReassignSection';
import TeamSummeryChart from '@/components/modules/dashboard/TeamSummeryChart';


const DashboardPage = async () => {
    const dashboardStats = await getDashboardStats();
    const recentReassignments = await getRecentReassignments();
    console.log(recentReassignments);
    return (
        <div className="space-y-6 p-6">
            <DashboardStats
                totalProjects={dashboardStats.allProjects}
                totalTasks={dashboardStats.allTasks}
                overloadedMembers={dashboardStats.overLoadedMembers}
            />

            <TeamSummeryChart members={dashboardStats.members} />

            <ReassignSection onReassign={reassignmentTasksFunction} />
            <ReassignHistory logs={recentReassignments} />
        </div>
    );
};

export default DashboardPage;