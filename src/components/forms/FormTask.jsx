/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import SelectForm from './selects/SelectForm';
import { getProjects } from '../../data/getData';

const FormTask = ({
  mode,
  name,
  description,
  startDate,
  endDate,
  priority,
  users,
  status,
  roles,
  project,
  saveFunction,
  cancelFunction,
  isError,
}) => {
  const formik = useFormik({
    initialValues: {
      name,
      description: description || '',
      startDate: startDate || '',
      status: status || '',
      endDate,
      priority,
      users: users || '', // doit être un []
      roles,
      project,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Ce champ est obligatoire')
        .min(2, 'le Nom doit contenir au minimum 2 lettres'),
      description: Yup.string()
        .required('Ce champ est obligatoire')
        .max(500, 'La description ne peut contenir que maximum 500 caractères'),
      startDate: Yup.date().required('Ce champ est obligatoire'),
      endDate: Yup.date().required('Ce champ est obligatoire'),
      priority: Yup.string().required('Ce champ est obligatoire'),
      assign: Yup.string().required('Ce champ est obligatoire'),
      roles: Yup.string().required('Ce champ est obligatoire'),
    }),
    onSubmitFinal: (taskValues) => {
      saveFunction(taskValues);
    },
    onSubmit: (taskValues) => {
      saveFunction(taskValues);
    },
  });
  const { data: projects } = useQuery('projects', getProjects);
  useEffect(() => {
    if (isError) {
      toast('Il y a une erreur', { className: 'errorToast' });
    }
  }, [isError]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="border-2 border-primary">
        <table className="table w-full space-y-6 text-sm">
          <thead className="text-white">
            <tr>
              <th className="p- text-primary bg-gray-100">
                <label htmlFor="name"> Projet </label>
              </th>
              <th className="p-3 text-primary bg-gray-100">
                <label htmlFor="description">Description</label>
              </th>
              <th className="p-3 text-primary bg-gray-100">
                <label htmlFor="responsable">Responsable </label>
              </th>
              <th className="p-3 text-primary bg-gray-100">
                <label htmlFor="users">Collaborateurs</label>
              </th>
              <th className="p-3 text-primary bg-gray-100">
                <label htmlFor="roles">Rôle</label>
              </th>
              <th className="p-3 text-primary bg-gray-100">
                <label htmlFor="priority">Priorité</label>
              </th>
              <th className="p-3 text-primary bg-gray-100">
                <label htmlFor="startDate">Date de début</label>
              </th>
              <th className="p-3 text-primary bg-gray-100">
                <label htmlFor="endDate">Date de fin</label>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className=" lg:text-black border-b-2 border-gray-200 hover:bg-blue-100">
              <td className="p-3 font-medium capitalize">
                <div className="flex justify-center items-center">
                  <SelectForm
                    data={projects}
                    name="project"
                    id={projects.id}
                    formik={formik}
                  />
                </div>
              </td>
              <td className="p-3 font-medium">
                <div className="flex justify-center items-center relative">
                  <p className=" whitespace-no-wrap cursor-pointer hover:text-primary">
                    <input
                      type="text"
                      name="description"
                      id="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="border text-center focus:ring-gray-500 focus:border-gray-900 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600 block"
                      placeholder="Description"
                    />
                    {formik.touched.description && formik.errors.description && (
                      <div className="absolute text-sm -bottom-5 text-red">
                        {formik.errors.description}
                      </div>
                    )}
                  </p>
                </div>
              </td>
              <td className="p-3 font-medium">
                <div className="flex justify-center items-center">
                  <img src="/img/ben.jpeg" className="w-10 h-10 rounded-full" alt="" />
                  <p className="whitespace-no-wrap pl-2">ceoName</p>
                </div>
              </td>
              <td className="p-3 font-medium">
                <div className="flex justify-center items-center w-40 relative">
                  <select
                    id="users"
                    name="users"
                    autoComplete="users"
                    value={formik.values.users}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm block">
                    <option value="" disabled selected>
                      Collaborateur
                    </option>
                    <option value="collab1">Collab1</option>
                    <option value="collab2">Collab2</option>
                  </select>
                  {formik.touched.assign && formik.errors.assign && (
                    <div className="absolute text-sm -bottom-5 text-red">
                      {formik.errors.assign}
                    </div>
                  )}
                </div>
              </td>
              <td className="p-3 font-medium">
                <div className="flex justify-center items-center w-40 relative">
                  <select
                    id="roles"
                    name="roles"
                    autoComplete="roles"
                    value={formik.values.roles}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm block">
                    <option value="" disabled selected>
                      Select role
                    </option>
                    <option value="Designer">Designer</option>
                    <option value="Front-End">Front-End</option>
                    <option value="Back-End">Back-End</option>
                  </select>
                  {formik.touched.roles && formik.errors.roles && (
                    <div className="absolute text-sm -bottom-5 text-red">
                      {formik.errors.roles}
                    </div>
                  )}
                </div>
              </td>
              <td className="p-3 font-medium">
                <div className="flex justify-center items-center w-40 relative">
                  <select
                    id="priority"
                    name="priority"
                    autoComplete="priority"
                    value={formik.values.priority}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm block">
                    <option value="" disabled selected>
                      Select priorité
                    </option>

                    <option value="High">Haute</option>
                    <option value="Mid">Normale</option>
                    <option value="Low">Basse</option>
                  </select>
                  {formik.touched.priority && formik.errors.priority && (
                    <div className="absolute text-sm -bottom-5 text-red">
                      {formik.errors.priority}
                    </div>
                  )}
                </div>
              </td>

              <td className="p-3 font-medium">
                <div className="flex justify-center items-center w-40 relative">
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
                    <div className="absolute text-sm -bottom-4 text-red">
                      {formik.errors.startDate}
                    </div>
                  )}
                </div>
              </td>
              <td className="p-3 font-medium">
                <div className="flex justify-center items-center w-40 relative">
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
                    <div className="absolute text-sm -bottom-4 text-red">
                      {formik.errors.endDate}
                    </div>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end p-4">
          <button
            type="submit"
            // disabled={!formik.isValid}
            className="btn primary mr-4">
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

export default FormTask;
