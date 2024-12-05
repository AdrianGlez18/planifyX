"use client";

import FormButton from "@/components/form/FormButton";
import FormInput from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { createBoard } from "@/lib/actions/board/create";
//import { createBoard } from "@/lib/actions/board.actions";
import { useAction } from "@/lib/hooks/useAction";

const BoardForm = () => {
  const { execute, fieldErrors, error, isLoading } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    }
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title });
  }

  return (
    <form action={onSubmit}>
      <div className="flex flex-col gap-2">
        <FormInput id="title"
        label="Board Title" errors={fieldErrors}/>
       {/*  <input
          id="title"
          type="text"
          name="title"
          placeholder="Enter a board title"
          className="border-black border p-1 rounded-md"
          required />
        {fieldErrors?.title && <p className="text-rose-500">{fieldErrors.title}</p>} */}
        {/* {state?.errors?.title && <p className="text-rose-500">{state.errors.title.map((error: string) => {
            return <p>{error}</p>
          })}</p>} */}
      </div>
      {/* <Button type="submit">Create</Button> */}
      <FormButton>
        Create
      </FormButton>

    </form>
  )
}

export default BoardForm