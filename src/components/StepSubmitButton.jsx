import { TailSpin } from "react-loader-spinner";

export const SubmitBtn = (props) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        props.submitFn();
      }}
      type="button"
      className="h-8 w-8 mt-12 hover:text-success"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  );
};

export const SubmittingBtn = () => {
  return (
    <button onClick={(e) => e.preventDefault()} className="h-8 w-8 mt-6">
      <TailSpin ariaLabel="loading-indicator" />
    </button>
  );
};

export const ErrorBtn = (props) => {
  return (
    <button
      className="h-8 w-8 mt-12 text-error"
      onClick={(e) => {
        e.preventDefault();
        props.resetFn();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  );
};

export const SuccessBtn = () => {
  return (
    <button
      onClick={(e) => e.preventDefault()}
      className="h-8 w-8 mt-12 text-success"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  );
};
