"use client";
import WrapperLayout from "@/app/wrapper.layout";
import SearchBar from "@/components/SearchBar";
import { useHooks } from "./hooks";
import CustomTable from "@/components/Table";

const ReportsPage = () => {
  const { handleSearch, columns, dataSource, tableHeaderActions } = useHooks();
  return (
    <WrapperLayout>
      <SearchBar handleSubmit={handleSearch} />
      <CustomTable
        tableHeader="Report List"
        columns={columns}
        dataSource={dataSource ?? []}
        headerActions={tableHeaderActions}
      />
    </WrapperLayout>
  );
};

export default ReportsPage;
