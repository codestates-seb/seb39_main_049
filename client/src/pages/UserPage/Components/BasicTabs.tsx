import Box from '@mui/material/Box';
import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';

export default function BasicTabs({
  setTab,
}: {
  setTab: Dispatch<SetStateAction<string>>;
}) {
  const [active, setActive] = useState('answers');
  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLSpanElement;
    if (target.id !== active) {
      setActive(target.id);
    }
    setTab(target.id);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Tabs>
          <Tab onClick={() => handleClick} id="answers">
            내 답변
          </Tab>
          <Tab onClick={() => handleClick} id="comments">
            내댓글
          </Tab>
        </Tabs>
      </Box>
    </Box>
  );
}
const Tabs = styled.div``;
const Tab = styled.span`
  margin-right: 20px;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;
