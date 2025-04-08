"use client";

import Alert from "./Alert";
import Avatar from "./Avatar";
import Button from "./buttons/Button";
import CancelButton from "./buttons/CancelButton";
import SubmitButton from "./buttons/SubmitButton";
import TextButton from "./buttons/TextButton";
import Code from "./Code";
import Description from "./Description";
import CameraIcon from "./icons/CameraIcon";
import UploadIcon from "./icons/UploadIcon";
import Input from "./Input";
import Loading from "./Loading";
import Note from "./Note";
import Progress from "./Progress";
import Skeleton from "./Skeleton";
import Spinner from "./Spinner";
import Title from "./Title";
import Warning from "./Warning";

export default function DesignPreview() {
  return (
    <div className="p-3 [&>section]:mt-5 [&>section]:p-5 [&>section]:bg-gray-100 [&_code]:block [&_code]:mt-5 [&_code]:p-3 [&_code]:bg-gray-200 ">
      <h1 className="text-2xl font-bold">Design Preview</h1>
      <p>Refer to the design below and use it for your need</p>

      <section>
        <h1>Spinner</h1>

        <Code code={`<Spinner />`} />
        <Spinner />

        <Code code={`<Loading loading={true} />`} />
        <Loading loading={true} />

        <Code code={`<Progress progress={50} />`} />
        <Progress progress={50} />
      </section>

      <section>
        <Code code={`<Alert>This is an alert</Alert>`} />
        <Alert>This is an alert</Alert>
        Use it to show an alert message to the user
      </section>
      <section>
        <Code code={`<Alert type="success">success</Alert>`} />
        <Alert type="info">Alert with info type</Alert>
      </section>
      <section>
        <Code code={`<Alert type="warning">Alert with warning</Alert>`} />
        <Alert type="warning">Alert with warning type</Alert>
      </section>

      <section>
        <Code code={`<Warning message="This is a warning message" />`} />
        <Warning message="This is a warning message" />
      </section>

      <section>
        <h1 className="font-bold text-lg">
          See the withcenter-react-components/README.md for details
        </h1>
        <Code code={`<Avatar alt="User Avatar" size={48} />`} />
        <Avatar alt="User Avatar" size={48} />
        <Code
          code={`<Avatar  alt="User Avatar" size={64} className="bg-blue-200 !text-blue-600"/>`}
        />
        <Avatar size={64} className="bg-blue-200 !text-blue-600" />

        <Code
          code={`<Avatar alt="User Avatar" size={80} className="bg-red-200 !text-red-600"/>`}
        />
        <Avatar
          src="https://picsum.photos/id/400/80/80"
          unoptimized={true}
          size={80}
          className="bg-red-200 !text-red-600"
        />
      </section>

      <section>
        <h1 className="font-bold text-lg">Buttons</h1>

        <Code code={`<Button>Default</Button>`} />
        <Button>Default</Button>

        <Code code={`<Button type="secondary">Secondary</Button>`} />
        <Button className="secondary">Secondary</Button>

        <Code code={`<CancelButton>Cancel</CancelButton>`} />
        <CancelButton>Cancel</CancelButton>

        <Code code={`<SubmitButton loading={false}>Submit</SubmitButton>`} />
        <SubmitButton loading={false}>Submit</SubmitButton>

        <Code code={`<SubmitButton loading={true}>Submit</SubmitButton>`} />
        <SubmitButton loading={true}>Submit</SubmitButton>

        <Code code={`<TextButton>Text Button</TextButton>`} />
        <TextButton>Text Button</TextButton>
      </section>

      <section>
        <h1 className="font-bold text-lg">Icons</h1>

        <Code code={`<CameraIcon />`} />
        <CameraIcon />

        <Code
          code={`<UploadIcon onFileChange={(e) => { alert(e?.name); }} />`}
        />
        <UploadIcon
          onFileChange={(e) => {
            alert(e?.name);
          }}
        />
      </section>

      <section>
        <h1 className="font-bold text-lg">Text</h1>

        <Code code={`<Description>This is a description</Description>`} />
        <Description>This is a description</Description>

        <Code code={`<Note>This is a note</Note>`} />
        <Note>This is a note</Note>

        <Code code={`<Title>This is a title</Title>`} />
        <Title>This is a title</Title>
      </section>

      <section>
        <h1 className="font-bold text-lg">Form</h1>

        <Code code={`<Input placeholder="Enter text" />`} />
        <Input placeholder="Enter text" className="mt-2" />
      </section>

      <section>
        <h1 className="font-bold text-lg">Skeletons</h1>

        <Skeleton />

        <Skeleton width={40} height={40} circle />

        <Skeleton width={120} height={36} className="rounded-md" />

        <div className="space-y-2">
          <Skeleton height={150} className="rounded-t-lg" />
          <Skeleton width="70%" />
          <Skeleton />
          <Skeleton width="80%" />
        </div>

        <Skeleton count={5} height={24} className="my-2" />

        <section className="flex flex-col gap-3 my-8 bg-gray-300 p-4">
          <nav className="flex gap-3">
            <Skeleton width={40} height={40} circle />
            <div className="flex gap-1 flex-col grow">
              <Skeleton width={120} height={16} className="rounded-md" />
              <Skeleton width="69%" height={16} className="rounded-md" />
            </div>
          </nav>
          <Skeleton height={150} className="rounded-t-lg" />
          <nav className="flex justify-between">
            <Skeleton width="44%" height={16} className="rounded-md" />
            <Skeleton width="28%" height={16} className="rounded-md" />
          </nav>
        </section>
      </section>
    </div>
  );
}
