import Link from 'next/link';
import React from 'react';
import { Button } from 'react-bootstrap';

interface PEGButtonProps {
  className?: string;
  text?: string;
  onClick?: () => void;
}
const PEGButton = (props: PEGButtonProps) => {
  const tradingUrl = process.env.NEXT_PUBLIC_TRADING_URL??"";
  return (
    <>
      <Link href={tradingUrl}>
        <Button
          variant="none"
          className={`custom-btn text-white ${props.className}`}
          onClick={props.onClick}
        >
          <span className="custom-btn-inner">{props.text}</span>
        </Button>
      </Link>
    </>
  );
};

export default PEGButton;
