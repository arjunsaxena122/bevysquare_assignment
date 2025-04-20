import connectDB from "@/libs/db";
import { Todo } from "@/model/todo.model";
import { NextResponse } from "next/server";
import cors from "cors"

await connectDB();
cors({
  methods:["GET","POST","PUT","DELETE","PATCH"],
  origin:`${process.env.NEXT_FRONTEND_URL}`
})

export async function GET(req) {
  const user = await Todo.find({});

  if (!user) {
    return NextResponse.json("There is no data available");
  }

  return NextResponse.json(user, {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

export async function POST(req) { 
  const { title, description } = await req.json();

  if (!title || !description) {
    return NextResponse.json("All fields are required");
  }

  const todo = await Todo.create({
    title,
    description,
  });

  return NextResponse.json(todo, {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function PUT(req) {
  const { id, title, description } = await req.json();

  if (!id) {
    return NextResponse.json("This todo doesn't exist");
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    {
      title,
      description,
    },
    {
      new: true,
    }
  );

  return NextResponse.json(updatedTodo, {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function DELETE(req) {
  const {id} = await req.json()
  console.log(id)

  if (!id) {
    return NextResponse.json({
      status:400,
      message:"This todo doesn't exist"
    });
  }

  const deletedTodo = await Todo.findByIdAndDelete(id);

  return NextResponse.json(deletedTodo, {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
