import React, { useState } from "react";
import { verifyIdentity, sendSms, prioritizeBeneficiaries } from "./services/api";

const App = () => {
  const [mosipId, setMosipId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authResult, setAuthResult] = useState(null);
  const [smsResult, setSmsResult] = useState(null);

  // For prioritizing beneficiaries
  const [aidCenterLat, setAidCenterLat] = useState("");
  const [aidCenterLon, setAidCenterLon] = useState("");
  const [beneficiaries, setBeneficiaries] = useState([
    { id: 1, lat: "", lon: "", priority: 1 },
  ]);
  const [prioritizedBeneficiaries, setPrioritizedBeneficiaries] = useState(null);

  const handleVerifyIdentity = async () => {
    const result = await verifyIdentity(mosipId);
    setAuthResult(result);
  };

  const handleSendSms = async () => {
    const result = await sendSms(phoneNumber);
    setSmsResult(result);
  };

  const handleAddBeneficiary = () => {
    setBeneficiaries([
      ...beneficiaries,
      { id: beneficiaries.length + 1, lat: "", lon: "", priority: 1 },
    ]);
  };

  const handleRemoveBeneficiary = (id) => {
    setBeneficiaries(beneficiaries.filter((b) => b.id !== id));
  };

  const handleBeneficiaryChange = (id, field, value) => {
    const updatedBeneficiaries = beneficiaries.map((b) =>
      b.id === id ? { ...b, [field]: value } : b
    );
    setBeneficiaries(updatedBeneficiaries);
  };

  const handlePrioritizeBeneficiaries = async () => {
    const result = await prioritizeBeneficiaries(aidCenterLat, aidCenterLon, beneficiaries);
    setPrioritizedBeneficiaries(result);
  };

  return (
    <div>
      <h1>ResQNet</h1>

      {/* Identity Verification Section */}
      <section>
        <h2>Identity Verification</h2>
        <input
          type="text"
          placeholder="Enter MOSIP ID"
          value={mosipId}
          onChange={(e) => setMosipId(e.target.value)}
        />
        <button onClick={handleVerifyIdentity}>Verify</button>
        {authResult && <pre>{JSON.stringify(authResult, null, 2)}</pre>}
      </section>

      {/* SMS Verification Section */}
      <section>
        <h2>SMS Verification</h2>
        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button onClick={handleSendSms}>Send SMS</button>
        {smsResult && <pre>{JSON.stringify(smsResult, null, 2)}</pre>}
      </section>

      {/* Prioritize Beneficiaries Section */}
      <section>
        <h2>Prioritize Beneficiaries</h2>
        <div>
          <h3>Aid Center Location</h3>
          <input
            type="number"
            placeholder="Aid Center Latitude"
            value={aidCenterLat}
            onChange={(e) => setAidCenterLat(e.target.value)}
          />
          <input
            type="number"
            placeholder="Aid Center Longitude"
            value={aidCenterLon}
            onChange={(e) => setAidCenterLon(e.target.value)}
          />
        </div>

        {beneficiaries.map((beneficiary) => (
          <div key={beneficiary.id}>
            <h4>Beneficiary {beneficiary.id}</h4>
            <input
              type="number"
              placeholder="Latitude"
              value={beneficiary.lat}
              onChange={(e) =>
                handleBeneficiaryChange(beneficiary.id, "lat", e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Longitude"
              value={beneficiary.lon}
              onChange={(e) =>
                handleBeneficiaryChange(beneficiary.id, "lon", e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Priority"
              value={beneficiary.priority}
              onChange={(e) =>
                handleBeneficiaryChange(beneficiary.id, "priority", e.target.value)
              }
            />
            <button onClick={() => handleRemoveBeneficiary(beneficiary.id)}>Remove</button>
          </div>
        ))}
        <button onClick={handleAddBeneficiary}>Add Beneficiary</button>
        <button onClick={handlePrioritizeBeneficiaries}>Prioritize</button>

        {prioritizedBeneficiaries && (
          <div>
            <h3>Prioritized Beneficiaries</h3>
            <pre>{JSON.stringify(prioritizedBeneficiaries, null, 2)}</pre>
          </div>
        )}
      </section>
    </div>
  );
};

export default App;