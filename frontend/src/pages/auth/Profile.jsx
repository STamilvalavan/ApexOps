import Layout from "../../Components/layout/Layout";

export default function Profile() {

  return (

    <Layout>

      <h1 className="text-2xl font-bold mb-6">
        User Profile
      </h1>

      <div className="bg-[#020617] border border-gray-800 p-6 rounded-xl">

        <p>Name: Rider</p>
        <p>Email: rider@example.com</p>
        <p>Bike: KTM Duke</p>

      </div>

    </Layout>

  );
}