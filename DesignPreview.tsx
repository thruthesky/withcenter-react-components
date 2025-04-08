import Alert from "./Alert";
import Avatar from "./Avatar";
import Spinner from "./Spinner";

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
        <header>
          <h1>Alert</h1>
        </header>
        <code>
          <Alert>This is an alert</Alert>
        </code>
        <code>
          &lt;Alert type=info&gt;info&lt;/Alert&gt;
          <Alert type="info">Alert with info type</Alert>
        </code>
        <code>
          &lt;Alert type=warning&gt;warning&lt;/Alert&gt;
          <Alert type="warning">Alert with warning type</Alert>
        </code>
      </section>

      <section>
        <header>
          <h1>Avatar</h1>
        </header>
        <code>
          &lt;Avatar src=path/to/image alt=User Avatar /&gt;
          <Avatar alt="User Avatar" size={48} />
        </code>
      </section>
    </div>
  );
}
