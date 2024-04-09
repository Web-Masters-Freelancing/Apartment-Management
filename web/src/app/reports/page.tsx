"use client";
import WrapperLayout from "@/app/wrapper.layout";
import SearchBar from "@/components/SearchBar";
import { useHooks } from "./hooks";
import CustomTable from "@/components/Table";
import { LinearProgress } from "@mui/material";

const ReportsPage = () => {
  const {
    handleSearch,
    columns,
    dataSource,
    tableHeaderActions,
    isFetchingPayments,
    tableCellActions,
  } = useHooks();
  return (
    <WrapperLayout>
      <SearchBar handleSubmit={handleSearch} />
      {isFetchingPayments ? (
        <LinearProgress color="primary" />
      ) : (
        <CustomTable
          tableHeader="Report List"
          columns={columns}
          dataSource={dataSource ?? []}
          headerActions={tableHeaderActions}
          cellActions={tableCellActions}
        />
      )}
    </WrapperLayout>
  );
};

export default ReportsPage;
