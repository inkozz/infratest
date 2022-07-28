/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FormProjet = ({
  mode,
  name,
  description,
  logo,
  users,
  startDate,
  endDate,
  status,
  saveFunction,
  cancelFunction,
}) => {
  const formik = useFormik({
    initialValues: {
      name,
      description: description || '',
      logo,
      startDate,
      endDate,
      status,
      users,
    },
    validationSchema: Yup.object({
      name: Yup.string(),
      logo: Yup.string(),
      description: Yup.string(),
      startDate: Yup.date(),
      endDate: Yup.date(),
      status: Yup.string(),
      users: Yup.string(),
    }),
    onSubmit: (projectValues) => {
      saveFunction(projectValues);
      console.log(projectValues);
    },
  });

  return (
    <div className="w-full">
      <form
        onSubmit={formik.handleSubmit}
        name="projetForm"
        className="border-2 border-primary">
        <table className="table w-full space-y-6 text-sm">
          <thead className="text-white">
            <tr>
              <th className="p- text-primary bg-gray-100">
                <label htmlFor="name"> Nom du projet </label>
              </th>
              <th className="p-3 text-primary bg-gray-100">
                <label htmlFor="responsable">Nom du responsable </label>
              </th>
              <th className="p-3 text-primary bg-gray-100">
                <label htmlFor="startDate">Date du début </label>
              </th>
              <th className="p-3 text-primary bg-gray-100">
                <label htmlFor="endDate">Date de fin</label>
              </th>
              <th className="p-3 text-primary bg-gray-100">
                <label htmlFor="status">Status</label>
              </th>
              <th className="p-3 text-primary bg-gray-100">
                <label htmlFor="users">Collaborateurs</label>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className=" lg:text-black border-b-2 border-gray-200 hover:bg-blue-100">
              <td className="p-3 font-medium capitalize">
                <div className="flex justify-center items-center">
                  <p className=" whitespace-no-wrap cursor-pointer hover:text-primary">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="border text-center focus:ring-gray-500 focus:border-gray-900 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Nom du projet"
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="">{formik.errors.name}</div>
                    )}
                  </p>
                </div>
              </td>
              <td className="p-3 font-medium capitalize">
                <div className="flex justify-center items-center">
                  <img src="/img/ben.jpeg" className="w-10 h-10 rounded-full" alt="" />
                  <p className="whitespace-no-wrap pl-2">ceoName</p>
                </div>
              </td>
              <td className="p-3 font-medium capitalize">
                <div className="flex justify-center items-center">
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formik.values.startDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="px-2 py-1 my-2 rounded focus:outline-none focus:ring-2 focus:ring-[#755342] block"
                  />
                  {formik.touched.startDate && formik.errors.startDate && (
                    <div className="">{formik.errors.startDate}</div>
                  )}
                </div>
              </td>
              <td className="p-3 font-medium capitalize">
                <div className="flex justify-center items-center">
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formik.values.endDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="px-2 py-1 my-2 rounded focus:outline-none focus:ring-2 focus:ring-[#755342] block"
                  />
                  {formik.touched.endDate && formik.errors.endDate && (
                    <div className="">{formik.errors.endDate}</div>
                  )}
                </div>
              </td>
              <td className="p-3 font-medium capitalize">
                <div className="flex justify-center items-center">
                  <select
                    id="status"
                    name="status"
                    autoComplete="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
                    <option value="" disabled selected>
                      Select priorité
                    </option>
                    <option value="En attente">En attente</option>
                    <option value="En cours">En cours</option>
                    <option value="Urgent">En priorité</option>
                  </select>
                  {formik.touched.status && formik.errors.status && (
                    <div className="absolute -bottom-5 text-sm text-red-600">
                      {formik.errors.status}
                    </div>
                  )}
                </div>
              </td>
              <td className="p-3 font-medium capitalize">
                <div className="flex justify-center items-center">
                  <select
                    id="users"
                    name="users"
                    autoComplete="users"
                    value={formik.values.users}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
                    <option value="" disabled selected>
                      Select collaborateurs
                    </option>
                    <option value="collab">Collab1</option>
                    <option value="collab2">Collab2</option>
                  </select>
                  {formik.touched.users && formik.errors.users && (
                    <div className="absolute -bottom-5 text-sm text-red-600">
                      {formik.errors.users}
                    </div>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end p-4">
          <button type="submit" disabled={!formik.isValid} className="btn primary mr-4">
            {mode !== 'edit' ? 'Créer' : 'Editer'}
          </button>
          <button
            type="button"
            className="btn cancel"
            onClick={cancelFunction}
            name="cancel">
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormProjet;
