import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {
  useGetAnnouncements,
  useDeleteAnnouncement,
} from "../../Services/announcementService";

export default function ViewAnnouncements() {
  const { data, error, loading, refetch } = useGetAnnouncements();
  const {
    deleteAnnouncement,
    error: deleteError,
    loading: deleteLoading,
  } = useDeleteAnnouncement();
  const [announcements, setAnnouncement] = useState([]);

  useEffect(() => {
    if (data && Array.isArray(data.data)) {
      setAnnouncement(data.data);
    } else {
      setAnnouncement([]);
    }
  }, [data]);
  console.log(announcements);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading announcements</p>;

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      await deleteAnnouncement(id);

      setAnnouncement((prev) => prev.filter((a) => a._id !== id));
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Announcements</h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-white uppercase bg-green-500 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Done By
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Message
              </th>
              <th scope="col" className="px-6 py-3">
                Send To
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement) => (
              <tr
                key={announcement._id}
                className="bg-white border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {announcement.title}
                </td>
                <td className="px-6 py-4">
                  {announcement.createdAt
                    ? new Date(announcement.createdAt).toLocaleDateString(
                        "en-GB"
                      ) // DD/MM/YYYY
                    : ""}
                </td>
                <td className="px-6 py-4">{announcement.doneBy}</td>
                <td className="px-6 py-4">{announcement.status}</td>
                <td className="px-6 py-4">{announcement.message}</td>
                <td className="px-6 py-4">{announcement.sendTo}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex gap-4">
                    <Link
                    to={`/edit-announcement/${announcement._id}`}
                    className="font-medium text-blue-600 hover:underline"
                    >
                    Edit
                    </Link>
                    <a
                      href="#"
                      className="font-medium text-red-600 hover:underline"
                      onClick={() => handleDelete(announcement._id)}
                    >
                      Delete
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
