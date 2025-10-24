"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { http } from "@/services/http.service";
import { ApiRoutes } from "@/config/api-routes.config";
import {
  npcGeneratorFormSchema,
  NpcGeneratorFormSchemaType,
} from "@/schemas/generator-form.shcema";

const FormGeneratorPage = () => {
  const form = useForm<NpcGeneratorFormSchemaType>({
    resolver: zodResolver(npcGeneratorFormSchema),
    defaultValues: {
      npc: { name: "", role: "", personality: "" },
      quest: { title: "", description: "" },
    },
  });

  async function onSubmit(values: NpcGeneratorFormSchemaType) {
    const baseUrl = new URL(ApiRoutes.generator.npcGenerator);
    const res = await http.post(baseUrl, values, {
      headers: {
        Authorization:
          "Berear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtaXRAZ3NuYWlsLmNvbSIsInN1YiI6MTgsImlhdCI6MTc2MTI5MzMyNCwiZXhwIjoxNzYxMjk2OTI0fQ.37Zb2g0SxBEAJfz853s17QkiFLIQZkcLL86rKix70VY",
      },
    });

    console.log("Response:", res);
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">
        NPC Dialog & Quest Generator
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold mb-4">NPC Details</h2>
            <FormField
              control={form.control}
              name="npc.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Arin the Merchant" {...field} />
                  </FormControl>
                  <FormMessage className="error-message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="npc.role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Merchant, Guard, Healer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="error-message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="npc.personality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Personality</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Cheerful and talkative"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="error-message" />
                </FormItem>
              )}
            />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold mb-4">Quest Details</h2>
            <FormField
              control={form.control}
              name="quest.title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Lost Relic of the Ancients"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="error-message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quest.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Briefly describe the quest..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="error-message" />
                </FormItem>
              )}
            />
          </section>

          <Button
            type="submit"
            variant="outline"
            disabled={form.formState.isSubmitting}
            className="btn-glow-blue w-full"
          >
            {form.formState.isSubmitting && <Spinner />}
            Generate NPC & Quest
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormGeneratorPage;
