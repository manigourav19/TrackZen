import { useEffect, useState } from "react";
import api from "./api";

const STATUSES = ["Backlog", "In Progress", "Review", "Done"];

export default function Board() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    api.get("/tickets").then(res => setTickets(res.data));
  }, []);

  return (
    <div className="p-6 grid grid-cols-4 gap-4">
      {STATUSES.map(status => (
        <div key={status} className="bg-gray-100 rounded p-3">
          <h3 className="font-bold mb-2">{status}</h3>
          {tickets.filter(t => t.status === status).map(t => (
            <div key={t.id} className="bg-white p-2 mb-2 rounded shadow">
              <p className="font-semibold">{t.title}</p>
              <small className="text-gray-500">{t.priority}</small>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
