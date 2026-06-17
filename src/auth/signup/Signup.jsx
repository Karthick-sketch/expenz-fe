export default function Signup() {
  return (
    <div className="flex flex-col gap-2 w-full max-w-sm mx-auto">
      <form action="" className="flex flex-col gap-2">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          className="border border-gray-300 p-2 rounded-md"
        />
        <label>Email</label>
        <input
          type="text"
          name="email"
          className="border border-gray-300 p-2 rounded-md"
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="border border-gray-300 p-2 rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
