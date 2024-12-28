import isDeepEqual from "@/lib/isDeepEqual";
import TableMDXPrimitive from "./primitives/TableMDXPrimitive/TableMDXPrimitive";
import { usePartWrapperContext } from "./wrappers/PartWrapper";
import PartHeader from "./primitives/PartHeader";
import { IParts_TableMDX } from "../mdxtypes";

interface ITableMDXPartFormValues extends IFormValues {
  originalState: IParts_TableMDX;
  currentValues: IParts_TableMDX;
}

export default function TableMDXPart() {
  // FormPartSelector which calls this component, ensures type correctness.
  // Asserting the correct type for local TS functionality
  const { formValues, setFormValues } = usePartWrapperContext() as {
    formValues: ITableMDXPartFormValues;
    setFormValues: React.Dispatch<
      React.SetStateAction<ITableMDXPartFormValues>
    >;
  };

  // not using this type validation to preserve a single origin of truth for the type field located in mdxtypes.d.ts
  // if(formValues.type !== 0)
  return (
    <>
      <PartHeader partName="Table Part" />
      <TableMDXPrimitive
        tableData={formValues.currentValues.tableData}
        setTableData={(tableData) => {
          setFormValues((prev) => ({
            ...formValues,
            currentValues: { ...formValues.currentValues, tableData },
            isOkToSave: !isDeepEqual(prev.originalState.tableData, tableData),
          }));
        }}
      />
    </>
  );
}
