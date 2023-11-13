import axios from "axios";
import { ChevronsUpDown } from "lucide-react";
import { useState, useEffect } from "react";

interface UserData {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
  phone: string;
}

export default function TableView() {
  const [data, setData] = useState<UserData[]>([]);
  const [sortColumn, setSortColumn] = useState<keyof UserData | null>(null);
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    // Mengambil data dari URL eksternal
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleSort = (column: keyof UserData) => {
    if (sortColumn === column) {
      // Toggle ascending/descending order if the same column is clicked again
      setIsAscending(!isAscending);
    } else {
      // Sort by the selected column in ascending order by default
      setIsAscending(true);
      setSortColumn(column);
    }

    const sortedData = [...data].sort((a, b) => {
      const valueA = a[column] as unknown as string;
      const valueB = b[column] as unknown as string;

      if (isAscending) {
        if (valueA < valueB) {
          return -1;
        }
        if (valueA > valueB) {
          return 1;
        }
        return 0;
      } else {
        if (valueA < valueB) {
          return 1;
        }
        if (valueA > valueB) {
          return -1;
        }
        return 0;
      }
    });

    setData(sortedData);
  };

  return (
    <div className="w-screen h-full">
      <table className="w-full border">
        <thead className="bg-[#191919] text-white">
          <tr>
            <th className="text-start text-lg">
              <label>No</label>
            </th>
            <th className="text-start text-lg">
              <div className="flex gap-2 items-center">
                <label>Name</label>
                <button onClick={() => handleSort("name")}>
                  <ChevronsUpDown size={20} />
                </button>
              </div>
            </th>
            <th className="text-start text-lg">
              <div className="flex gap-2 items-center">
                <label>Email</label>
                <button onClick={() => handleSort("email")}>
                  <ChevronsUpDown size={20} />
                </button>
              </div>
            </th>
            <th className="text-start text-lg">
              <div className="flex gap-2 items-center">
                <label>Address</label>
                <button onClick={() => handleSort("address")}>
                  <ChevronsUpDown size={20} />
                </button>
              </div>
            </th>
            <th className="text-start text-lg">
              <div className="flex gap-2 items-center">
                <label>Phone</label>
                <button onClick={() => handleSort("phone")}>
                  <ChevronsUpDown size={20} />
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="text-white">
          {data.map((item, index) => (
            <tr
              key={item.id}
              className={index % 2 === 0 ? "bg-[#212126]" : "bg-[#28282E]"}
            >
              <td className="p-4">{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.address.street}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
