import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddTransaction = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const options = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
    { value: "investment", label: "Investment" },
    { value: "savings", label: "Savings" },
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const handleAddTransaction = (data) => {
    const transactionData = {
      ...data,
      type: data.type.value,
    };

    console.log(transactionData);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed)
        axiosSecure
          .post("/transactions", transactionData)
          .then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                title: "Added!",
                text: "Your transaction has been added.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
    });

    reset();
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-200 rounded-xl p-6 md:p-10 shadow-xl">
      <h1 className="text-3xl md:text-4xl font-semibold mb-8">
        Add Your Transaction
      </h1>

      <form onSubmit={handleSubmit(handleAddTransaction)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title</label>

          <input
            type="text"
            placeholder="Title"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black"
            {...register("title", {
              required: "Title is required",
            })}
          />

          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Amount + Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Amount */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Amount
            </label>

            <input
              type="number"
              placeholder="Enter amount"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black"
              {...register("amount", {
                required: "Amount is required",
              })}
            />

            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Date</label>

            <input
              type="date"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black"
              {...register("date", {
                required: "Date is required",
              })}
            />

            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>
        </div>

        {/* Type + Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Type</label>

            <Controller
              name="type"
              control={control}
              rules={{
                required: "Type is required",
              }}
              render={({ field }) => (
                <Select
                  className="p-1 border border-gray-300 rounded-xl"
                  {...field}
                  options={options}
                  placeholder="Select Type"
                />
              )}
            />

            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Category
            </label>

            <input
              type="text"
              placeholder="Enter category"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black"
              {...register("category", {
                required: "Category is required",
              })}
            />

            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        {/* Note */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Note</label>

          <textarea
            rows="4"
            placeholder="Write a short note..."
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black"
            {...register("note")}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-background hover:bg-gray-800 transition text-white py-3 rounded-xl font-semibold text-lg cursor-pointer"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
