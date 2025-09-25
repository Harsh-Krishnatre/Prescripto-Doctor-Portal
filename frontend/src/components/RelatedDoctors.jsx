import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);
  const navigate = useNavigate();

  const findRelDoc = () => {
    const relatedDoc = doctors.filter(
      (d) => d.speciality === speciality && d._id !== docId
    );
    console.log(relatedDoc);
    setRelDoc(relatedDoc);
  };

  useEffect(() => {
    if (doctors.length > 0 && speciality && docId) {
      findRelDoc();
    }
  }, [doctors, docId, speciality]);

  return (
    <div>
      <div className="flex flex-col items-center my-20 px-4">
        <p className="text-3xl font-medium text-center">Related Doctors</p>
        <p className="text-sm text-gray-500 font-medium text-center">
          Simply browse through our extensive list of trusted doctors.
        </p>

        <div className="w-full max-w-6xl mt-10">
          {relDoc.length === 0 && (
            <p className="text-gray-500 font-medium text-center">
              No related doctors found.
            </p>
          )}

          {relDoc.length > 0 && (
            // 1. THIS IS THE KEY CHANGE: Using Flexbox for centering
            <div className="flex flex-wrap justify-center gap-6">
              {relDoc.slice(0, 5).map((doc, index) => (
                // 2. The card now has a defined width
                <div
                  key={index}
                  className="w-full max-w-[230px] border border-blue-200 rounded-xl shadow-sm hover:translate-y-[-5px] transition-all duration-500 overflow-hidden cursor-pointer"
                  onClick={() => {
                    navigate(`/appointments/${doc._id}`);
                    scrollTo(0, 0);
                  }}
                >
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="bg-blue-50 w-full"
                  />
                  <div className="p-4">
                    <div className="text-green-500 gap-2 text-sm flex items-center">
                      <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                      <p>Available</p>
                    </div>
                    <p className="text-lg font-medium">{doc.name}</p>
                    <p className="text-sm text-gray-500">{doc.speciality}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RelatedDoctors;
