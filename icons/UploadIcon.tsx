import CameraIcon from "./CameraIcon";

/**
 * 카메라 아이콘을 보여주고, 클릭을 하면, 선택된 파일을 onFileChange로 전달하는 컴포넌트이다.
 *
 * CameraIcon 은, 그냥 아이콘만 보여주지만, 이 UploadIcon 컴포넌트는 선택된 파일을 콜백으로 전달해 준다.
 * @param param0
 * @returns
 */
export default function UploadIcon({
  onFileChange,
  className = "",
}: {
  onFileChange: (file?: File) => void;
  className?: string;
}) {
  return (
    <label
      data-testid="UploadIcon"
      htmlFor="file-upload-input"
      className={"cursor-pointer" + " " + className}
    >
      <CameraIcon className="lg:pb-2 lg:pr-2" />
      <input
        id="file-upload-input"
        className="hidden"
        type="file"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onFileChange(e.currentTarget.files?.[0]);
        }}
      />
    </label>
  );
}
