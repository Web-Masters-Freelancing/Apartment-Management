"use client";
import WrapperLayout from "@/app/wrapper.layout";
import { useHook } from "./hooks";
import SearchBar from "@/components/SearchBar";
import CustomTable from "@/components/Table";

const BillablesPage = () => {
  const { handleSearch, columns, dataSource } = useHook();
  return (
    <WrapperLayout>
      <SearchBar handleSubmit={handleSearch} />
      <CustomTable
        tableHeader="Billables List"
        columns={columns}
        dataSource={dataSource}
      />
    </WrapperLayout>
  );
};

export default BillablesPage;
