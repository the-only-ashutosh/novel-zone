"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

// enum Error {
//   Configuration = "Configuration",
//   // AccessDenied = "AccessDenied",
//   // AccountNotLinked = "AccountNotLinked",
//   // AdapterError = "AdapterError",
//   // CallbackRouteError = "CallbackRouteError",
//   // CredentialsSignin = "CredentialsSignin",
// }
const Errors = [
  "Configuration",
  "AccessDenied",
  "AccountNotLinked",
  "AdapterError",
  "CallbackRouteError",
  "CredentialsSignin",
];
const ErrorElements = [
  <p key="Configuration">
    There was a problem when trying to authenticate. Please contact us if this
    error persists. Unique error code:{" "}
    <code className="rounded-sm bg-slate-100 p-1 text-xs">Configuration</code>
  </p>,
  <p key="AccessDenied">
    There was a problem when trying to authenticate. Please contact us if this
    error persists. Unique error code:{" "}
    <code className="rounded-sm bg-slate-100 p-1 text-xs">AccessDenied</code>
  </p>,
  <p key="AccountNotLinked">
    There was a problem when trying to authenticate. Please contact us if this
    error persists. Unique error code:{" "}
    <code className="rounded-sm bg-slate-100 p-1 text-xs">
      AccountNotLinked
    </code>
  </p>,
  <p key="AdapterError">
    There was a problem when trying to authenticate. Please contact us if this
    error persists. Unique error code:{" "}
    <code className="rounded-sm bg-slate-100 p-1 text-xs">AdapterError</code>
  </p>,
  <p key="CallbackRouteError">
    There was a problem when trying to authenticate. Please contact us if this
    error persists. Unique error code:{" "}
    <code className="rounded-sm bg-slate-100 p-1 text-xs">
      CallbackRouteError
    </code>
  </p>,
  <p key="CredentialsSignin">
    There was a problem when trying to authenticate. Please contact us if this
    error persists. Unique error code:{" "}
    <code className="rounded-sm bg-slate-100 p-1 text-xs">
      CredentialsSignin
    </code>
  </p>,
];

// const errorMap = {
//   [Error.Configuration]: (
//     <p>
//       There was a problem when trying to authenticate. Please contact us if this
//       error persists. Unique error code:{" "}
//       <code className="rounded-sm bg-slate-100 p-1 text-xs">Configuration</code>
//     </p>
//   ),
// [Error.AccessDenied]: (
//   <p>
//     There was a problem when trying to authenticate. Please contact us if this
//     error persists. Unique error code:{" "}
//     <code className="rounded-sm bg-slate-100 p-1 text-xs">Configuration</code>
//   </p>
// ),
// };

export default function AuthErrorPage() {
  const search = useSearchParams();
  const error = search.get("error");

  if (!error) return <div>No Error Found.</div>;

  const i = Errors.indexOf(error);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Link
        href="#"
        className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 flex flex-row items-center justify-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Something went wrong
        </h5>
        <div className="font-normal text-gray-700 dark:text-gray-400">
          {i !== -1
            ? ErrorElements[i]
            : "Please contact us if this error persists."}
        </div>
      </Link>
    </div>
  );
}
