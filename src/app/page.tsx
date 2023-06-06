"use client";

import React, { useRef } from 'react'
import BackIcon from '@/icons/Back'
import CopyIcon from '@/icons/Copy'
import FontIcon from '@/icons/Font'
import ForwardIcon from '@/icons/Forward'
import PlusIcon from '@/icons/Plus'
import RefreshIcon from '@/icons/Refresh'
import ShareIcon from '@/icons/Share'
import SidebarIcon from '@/icons/Sidebar'

export default function Home() {
  const main = useRef<HTMLElement>(null);
  const iframe = useRef<HTMLIFrameElement>(null);
  const search = useRef<HTMLInputElement>(null);

  const [enteredValue, setEnteredValue] = React.useState('https://www.google.com');
  const [url, setUrl] = React.useState('https://www.google.com');

  const [focused, setFocused] = React.useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => {
    setFocused(false);
    setEnteredValue(url);
  };

  const [domain, setDomain] = React.useState('');
  React.useEffect(() => {
    const urlMatch = setTimeout(() => {
      const getDomain = url.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/);
      if (getDomain) {
        setDomain(getDomain[0]);
      }
    }, 300);
    return () => clearTimeout(urlMatch);
  }, [url]);

  const handleValue = () => {
    if (focused) {
      return enteredValue;
    } else {
      return domain;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const movementStrength = 25;
    const height = movementStrength / window.screen.height;
    const width = movementStrength / window.screen.width;
    const pageX = e.pageX - (window.screen.width / 2);
    const pageY = e.pageY - (window.screen.height / 2);
    const amountMovedX = width * pageX * -1 - 25;
    const amountMovedY = height * pageY * -1 - 50;

    if (main.current) {
      main.current.style.backgroundPositionX = `${amountMovedX}px`;
      main.current.style.backgroundPositionY = `${amountMovedY}px`;
    }
  };

  return (
    <main
      ref={main}
      className="flex flex-col items-center justify-center min-h-screen gap-4"
      onMouseMove={handleMouseMove}
    >
      <div className="-mt-12 w-2/3 bg-[rgba(051,051,051,0.3)] backdrop-blur rounded-full h-14 flex items-center justify-evenly">
        <button type='button' className="p-3 rounded-full w-max h-max bg-[rgba(155,155,155,0.3)] hover:bg-[rgba(155,155,155,0.5)]">
          <SidebarIcon />
        </button>
        <button type='button' className="p-3 rounded-full w-max h-max bg-[rgba(155,155,155,0.3)] hover:bg-[rgba(155,155,155,0.5)]">
          <BackIcon
            onClick={() => {
              if (iframe.current !== null && iframe.current.contentWindow) {
                iframe.current.contentWindow.history.back();
              }
            }}
          />
        </button>
        <button type='button' className="p-3 rounded-full w-max h-max bg-[rgba(155,155,155,0.3)] hover:bg-[rgba(155,155,155,0.5)]">
          <ForwardIcon
            onClick={() => {
              if (iframe.current !== null && iframe.current.contentWindow) {
                iframe.current.contentWindow.history.forward();
              }
            }}
          />
        </button>
        <div className="w-3/4 h-[calc(100%-16px)] rounded-full bg-[rgba(64,64,64,0.6)] flex justify-center items-center px-2">
          <button type="button" className="mx-2 text-xl">
            <FontIcon />
          </button>
          <input
            ref={search}
            type="text"
            className="w-full mx-4 text-center bg-transparent"
            value={handleValue()}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={(event) => setEnteredValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                const httpCheck = enteredValue.includes('https://') ? enteredValue : enteredValue.includes('http://') ? enteredValue : `https://${enteredValue}`;
                setUrl(httpCheck);
                setFocused(false);
              }
            }}
          />
          <button
            type="button"
            className="mx-2 text-xl"
            onClick={() => {
              if (iframe.current !== null && iframe.current.contentWindow) {
                iframe.current.contentWindow.location.reload();
              }
            }}
          >
            <RefreshIcon />
          </button>
        </div>
        <button type='button' className="p-3 rounded-full w-max h-max bg-[rgba(155,155,155,0.3)] hover:bg-[rgba(155,155,155,0.5)]">
          <ShareIcon />
        </button>
        <button type='button' className="p-[.4rem] rounded-full w-max h-max bg-[rgba(155,155,155,0.3)] hover:bg-[rgba(155,155,155,0.5)]">
          <PlusIcon />
        </button>
        <button type='button' className="p-3 rounded-full w-max h-max bg-[rgba(155,155,155,0.3)] hover:bg-[rgba(155,155,155,0.5)]">
          <CopyIcon />
        </button>
      </div>
      <div className="w-2/3 bg-[rgba(111,111,111,0.1)] backdrop-blur rounded-2xl h-[calc(100vh-200px)] overflow-hidden">
        <iframe
          title="Inline Frame Example"
          width="100%"
          height="100%"
          ref={iframe}
          src={url}>
        </iframe>
      </div>
    </main >
  )
}
