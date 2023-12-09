import { ITable } from "../../../back/types";
import { API } from "../../api";

const mapApi = API.injectEndpoints({
  endpoints: (b) => ({
    tables: b.query<ITable[], void>({
      query: () => ({ url: `tables`, method: "POST" }),
    }),
    tableCreate: b.mutation<void, ITable>({
      query: (body) => ({ url: `table-create`, method: "POST", body }),
    }),
    tableUpdate: b.mutation<void, ITable>({
      query: (body) => ({ url: `table-update`, method: "POST", body }),
    }),
    tableDelete: b.mutation<void, number>({
      query: (id) => ({ url: `table-delete`, method: "POST", body: { id } }),
    }),
  }),
  overrideExisting: false,
});

export const { useTablesQuery, useTableCreateMutation, useTableDeleteMutation, useTableUpdateMutation } =
  mapApi;
