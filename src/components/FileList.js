import React from "react";
import styled from "styled-components";
import Card from "./lib/Card";
import Status from "./lib/Status";
import ChainInfo from "./ChainInfo";
import { isFileAnchored } from "../helpers/bytes";

const FileListWrapper = styled.ul`
  list-style: none;
  padding: 0;
`;

const FileListItemWrapper = styled.li`
  margin-top: 20px;
`;

const FileListItemCard = styled(Card)`
  font-size: 16px;
  padding: 2em;
  display: flex;
  flex-direction: column;
`;

const FileTitle = styled.span`
  font-size: 18px;
  color: #3d5873;
`;

const FileListItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Field = styled.span`
  font-size: 12px;
  line-height: 2em;
  color: #8997a5;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileListItem = ({
  file: { name, digest, servertimestamp, ...fileProps }
}) => {
  return (
    <FileListItemWrapper>
      <FileListItemCard>
        <FileListItemHeader>
          <FileTitle>{name}</FileTitle>
          <Status
            type={isFileAnchored(fileProps) ? "active" : "pending"}
            label={isFileAnchored(fileProps) ? "Anchored" : ""}
          />
        </FileListItemHeader>
        <Field>
          <b>Digest: </b> {digest}
        </Field>
        {isFileAnchored(fileProps) ? (
          <ChainInfo {...fileProps.chaininformation} />
        ) : null}
      </FileListItemCard>
    </FileListItemWrapper>
  );
};

const FileList = ({ files }) => {
  return (
    <FileListWrapper>
      {files.map((f, idx) => (
        <FileListItem key={`file-${idx}`} file={f} />
      ))}
    </FileListWrapper>
  );
};

export default FileList;