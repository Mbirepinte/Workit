import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetFirmData, UpdateFirm, DeleteFirm } from "../apis/firmApi";
import DashboardFirmOffers from "./DashboardFirmOffers";
import { GetAllFirms } from "../utils/getAllEnterprises";
import "../styles/FirmForm.css";
import NavBar from "./NavBar";

const FirmForm = () => {
  const { id } = useParams();
  const [firm, setFirm] = useState([]);
  const [message, setMessage] = useState("");

  const getFirmData = async () => {
    await GetFirmData(id)
      .then((res) => setFirm(res.data))
      .catch((err) => console.warn(err));
  };

  useEffect(() => {
    getFirmData();
  }, []);

  const handleChange = (e, customValue) => {
    const { name, value } = e.target;
    setFirm((prevState) => ({
      ...prevState,
      [name]: customValue ?? value,
    }));
  };

  const updateFirm = async () => {
    try {
      await UpdateFirm(firm, id);
      setMessage("Mise à jour effectuée avec succès");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleDelete = () => {
    DeleteFirm(id)
      .then(() => GetAllFirms())
      .catch((err) => console.warn(err));
  };

  return (
    <>
      <div>
        <NavBar />
        <div className="firm_form_dashboard">
          <div className="box_firm_body_title">
            <h2>Fiche entreprise</h2>
          </div>
          <div className="box_firm_body">
            <div className="informations-entreprise">
              <div className="first_line_details">
                <div className="first_line_text">
                  <div className="entreprise_name">
                    <label
                      htmlFor="name"
                      className="firm_form_enterprise_label"
                    >
                      Nom de l'entreprise
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="small-input"
                      value={firm.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="consultant_firm">
                    <label htmlFor="consultant_id"> Consultant attitré</label>
                    <input
                      type="text"
                      name="consultant_id"
                      id="consultant_id"
                      className="very-small-input"
                      value={firm.consultant_id}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="Id_firm">
                  <label htmlFor="consultant_id"> Id client </label>
                  <input
                    type="text"
                    name="consultant_id"
                    id="consultant_id"
                    className="very-small-input"
                    value={firm.id}
                  />

                  <label htmlFor="type"> Secteur </label>
                  <input
                    type="text"
                    name="type"
                    id="type"
                    className="very-small-input"
                    value={firm.type}
                    onChange={handleChange}
                  />
                </div>{" "}
              </div>
              <div className="logo_firm_block">
                <img
                  src={firm.logo_url}
                  alt="Logo_firm"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="third_line-details">
              <div className="third_line-details-block">
                <label htmlFor="email" className="firm_form_label">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="small-input"
                  value={firm.email}
                  onChange={handleChange}
                />
              </div>
              <div className="third_line-details-block">
                <label htmlFor="contact_phone" className="firm_form_label">
                  Téléphone
                </label>
                <input
                  type="text"
                  name="contact_phone"
                  id="contact_phone"
                  className="small-input"
                  value={firm.contact_phone}
                  onChange={handleChange}
                />
              </div>

              <div className="third_line-details-block">
                {" "}
                <label htmlFor="adress" className="firm_form_label">
                  Adresse
                </label>
                <input
                  type="text"
                  name="adress"
                  id="adress"
                  className="small-input"
                  value={firm.adress}
                  onChange={handleChange}
                />
              </div>

              <div className="third_line-details-block">
                <label htmlFor="city" className="firm_form_label">
                  Ville
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="small-input"
                  value={firm.city}
                  onChange={handleChange}
                />
              </div>

              <div className="third_line-details-block">
                {" "}
                <label htmlFor="country" className="firm_form_label">
                  Pays{" "}
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  className="small-input"
                  value={firm.country}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="box_firm_footer">
              <div className="firm_form_message_spe">
                <p>{message}</p>
              </div>
              <div className="validate_edit">
                <button
                  type="submit"
                  className="firm_form_modify_button"
                  onClick={updateFirm}
                >
                  Modifier
                </button>
                <button
                  type="submit"
                  className="firm_form_delete_button"
                  onClick={handleDelete}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
      <div className="current_offers">
        <DashboardFirmOffers id={id} />
      </div>
    </>
  );
};

export default FirmForm;
