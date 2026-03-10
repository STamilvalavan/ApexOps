import { motion } from "framer-motion";
import Layout from "../Components/layout/Layout";
import StatCard from "../Components/ui/StatCard";
import RideAnalytics from "../Components/dashboard/RideAnalytics";
import { pageTransition } from "../animations/pageTransition";
import ServiceTimeline from "../Components/dashboard/ServiceTimeline";
import GarageHealth from "../Components/dashboard/GarageHealth";

export default function Dashboard() {

  return (

    <Layout>

      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
        className="space-y-10"
      >

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              ApexOps Dashboard
            </h1>

            <p className="text-gray-400 text-sm mt-1">
              Monitor your motorcycle health and ride analytics
            </p>

          </div>

        </div>


        {/* Stat Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          <StatCard
            title="Last Oil Change"
            value="18 Days Ago"
            subtitle="Next in 600 km"
          />

          <StatCard
            title="Chain Lube"
            value="9 Days Ago"
            subtitle="Next in 300 km"
          />

          <StatCard
            title="Next Service"
            value="2 Weeks"
            subtitle="Predicted"
          />

        </div>

        {/* Garage Health Section */}
        
         <GarageHealth />


          {/* Analytics + Timeline */}
        
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            
            <RideAnalytics />
            <ServiceTimeline />
           </div>

          {/* Placeholder for upcoming module */}

          <div className="bg-[#020617] border border-gray-800 p-6 rounded-xl">

            <h3 className="text-lg mb-4">
              Upcoming Service
            </h3>

            <div className="space-y-3 text-sm text-gray-400">

              <p>
                🛠 Oil Change — Expected in 600 km
              </p>

              <p>
                ⚙ Chain Lube — Expected in 300 km
              </p>

              <p>
                🔧 Brake Check — Next Month
              </p>

            </div>

          </div>


      </motion.div>

    </Layout>

  );

}