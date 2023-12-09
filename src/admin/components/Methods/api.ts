import { IMethod } from "../../../back/types";
import { API } from "../../api";

const methodsApi = API.injectEndpoints({
  endpoints: (b) => ({
    methods: b.query<IMethod[], undefined>({
      query: () => ({
        url: `methods`,
        method: "POST",
      }),
    }),
    method: b.query<IMethod, number>({
      query: (id) => ({
        url: `method`,
        method: "POST",
        body: { id },
      }),
    }),
    methodUpdate: b.mutation<void, IMethod>({
      query: (body) => ({
        url: `method-update`,
        method: "POST",
        body,
      }),
    }),
    methodCreate: b.mutation<void, IMethod>({
      query: (body) => ({
        url: `method-create`,
        method: "POST",
        body,
      }),
    }),
    methodDelete: b.mutation<void, number>({
      query: (id) => ({
        url: `method-delete`,
        method: "POST",
        body: {
          id,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useMethodsQuery,
  useLazyMethodQuery,
  useLazyMethodsQuery,
  useMethodCreateMutation,
  useMethodDeleteMutation,
  useMethodUpdateMutation,
} = methodsApi;
