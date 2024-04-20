import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/router"

export const useAddProductForm = () => {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Le nom doit comporter au moins 3 caractères")
        .matches(
          /^[a-zA-Z0-9 ]*$/u,
          "Le nom ne doit pas contenir de caractères spéciaux",
        )
        .required("Le nom du produit est obligatoire"),
      price: Yup.number()
        .positive("Le prix doit être un nombre positif")
        .required("Le prix est obligatoire"),
      description: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })
        router.push("/backoffice")
      } catch (error) {
        //Console.error("Failed to add product:", error)
      }
    },
  })

  return formik
}
