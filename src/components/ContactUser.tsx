import { DispatchApp, RootState } from "@eli/store/storePoducts/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataUser } from "@eli/store/ProductSlice/UserDataSlice";
import { TopLevel } from "@eli/store/ProductData";
import { PuffLoader } from "react-spinners";
import Modal from "./Modal";

const ContactUser: React.FC = () => {
  const dispatch = useDispatch<DispatchApp>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  const [loadings, setloadings] = useState<boolean>(false);
  const [showModal, setshowModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<TopLevel | null>(null);

  const toggleModal = (user?: TopLevel) => {
    setSelectedUser(user || null);
    setshowModal((prev) => !prev);
  };

  useEffect(() => {
    dispatch(fetchDataUser());
    setloadings(true);

    setTimeout(() => {
      setloadings(false);
    }, 2000);
  }, [dispatch]);

  if (loading && loadings) return <div>loading ...</div>;
  if (error) return <div>error ...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loadings ? (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
            <div className="flex flex-col items-center">
              <PuffLoader color="#6a0dad" />
              <p className="mt-4">Loading, please wait...</p>
            </div>
          </div>
        ) : (
          users?.map((user: TopLevel) => (
            <div
              key={user.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-semibold text-lg">{user.name}</h2>
                  <p className="text-gray-600">{user.username}</p>
                </div>
              </div>
              <div className="text-gray-700">
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Company: {user.company.name}</p>
                <button
                  className="inline-block mt-5 px-4 py-2 text-white bg-green-600 rounded hover:bg-purple-700 transition duration-200 "
                  onClick={() => toggleModal(user)}
                >
                  Detail
                </button>
              </div>

              <Modal open={showModal} onClose={() => toggleModal(user)}>
                {selectedUser && (
                  <div className="p-4" key={selectedUser.id}>
                    <h2 className="text-xl font-semibold mb-2">
                      {selectedUser.name}
                    </h2>
                    <h4 className="font-medium">
                      Username: {selectedUser.username}
                    </h4>
                    <h4 className="font-medium">Email: {selectedUser.email}</h4>
                    <h4 className="font-medium">Phone: {selectedUser.phone}</h4>
                    <h4 className="font-medium">
                      Street: {selectedUser.address.street}
                    </h4>
                    <h4 className="font-medium">
                      City: {selectedUser.address.city}
                    </h4>
                    <h4 className="font-medium">
                      Zip Code: {selectedUser.address.zipcode}
                    </h4>
                    <h4 className="font-medium">
                      Website: {selectedUser.website}
                    </h4>
                    <ul className="mt-2">
                      <li>Company: {selectedUser.company.name}</li>
                      <li>Catch Phrase: {selectedUser.company.catchPhrase}</li>
                      <li>BS: {selectedUser.company.bs}</li>
                    </ul>
                  </div>
                )}
              </Modal>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactUser;
