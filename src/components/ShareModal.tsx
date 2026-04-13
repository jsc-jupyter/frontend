type ShareModalProps = {
  modalId: string;
  copyBtnId: string;
  serviceId: string;
  rowId: string;
  onCopy?: () => void;
};

const ShareModal = ({
  modalId,
  copyBtnId,
  serviceId,
  rowId,
  onCopy,
}: ShareModalProps) => (
  <div className="modal fade" id={modalId} role="dialog" tabIndex={-1}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title" style={{ color: "black" }}>
            Share Workshop
          </h4>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <p style={{ color: "black" }}>Share your configuration</p>
          <a href="" target="_blank" rel="noreferrer"></a>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-default"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            data-service={serviceId}
            data-row={rowId}
            id={copyBtnId}
            className="btn btn-outline-primary"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Copy to clipboard"
            onClick={onCopy}
          >
            Copy URL
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ShareModal;
