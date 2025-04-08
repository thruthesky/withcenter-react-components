import Alert from "./Alert";
import Avatar from "./Avatar";
import Code from "./Code";
import Spinner from "./Spinner";
import Warning from "./Warning";

export default function DesignPreview() {
  return (
    <div className="p-3 [&>section]:mt-5 [&>section]:p-5 [&>section]:bg-gray-100 [&_code]:block [&_code]:mt-5 [&_code]:p-3 [&_code]:bg-gray-200 ">
      <h1 className="text-2xl font-bold">Design Preview</h1>
      <p>Refer to the design below and use it for your need</p>

      <section>
        <header>
          <h1>Spinner</h1>
        </header>
        <Spinner />
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
        <Code code={`<Warning>This is a warning message</Warning>`} />
        <Warning>This is a warning message</Warning>
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
          code={`<Avatar  alt="User Avatar" size={64} className="bg-blue-200 !text-blue-600"/>`}
        />
        <Avatar size={64} className="bg-blue-200 !text-blue-600" />
        <Code
          code={`<Avatar alt="User Avatar" size={80} className="bg-red-200 !text-red-600"/>`}
        />
        <Avatar
          src="https://picsum.photos/id/300/80/80"
          unoptimized={true}
          size={80}
          className="bg-red-200 !text-red-600"
        />
      </section>
    </div>
  );
}
