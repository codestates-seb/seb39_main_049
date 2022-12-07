const UserPageAvatarWrapper = ({
  size,
  src,
  onMouseOver,
  onMouseOut,
  isHover,
  handleClick,
}: {
  size: number | string;
  src: string;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  isHover?: boolean;
  handleClick?: (e: any) => void;
}) => {
  return (
    <>
      <img
        role="presentation"
        src={src}
        alt={src}
        style={{
          width: size,
          height: size,
          cursor: 'pointer',
          filter: 'brightness(100%)',
          borderRadius: '100px',
        }}
        onFocus={onMouseOver}
        onMouseOver={onMouseOver}
        onBlur={onMouseOut}
        onMouseOut={onMouseOut}
        onClick={handleClick}
      ></img>
      {isHover && (
        <div
          style={{
            position: 'absolute',
            top: '200px',
            color: 'white',
            pointerEvents: 'none',
            width: '80px',
          }}
        >
          {'이미지 변경'}
        </div>
      )}
    </>
  );
};

export default UserPageAvatarWrapper;
