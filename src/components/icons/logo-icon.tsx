import type { SVGProps } from 'react';

export function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.5 4H9.5C7.567 4 6 5.567 6 7.5V16.5C6 18.433 7.567 20 9.5 20H14.5C16.433 20 18 18.433 18 16.5V7.5C18 5.567 16.433 4 14.5 4Z"
        stroke="currentColor"
        strokeWidth="1.5" // Adjusted for better visual balance
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
        stroke="currentColor"
        strokeWidth="1.5" // Adjusted
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16 7.5H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
