import { useEffect } from "react";
import usePaymentRepository from "../hooks/use-payment-repository";

export const IndexPage = () => {

  const repository = usePaymentRepository();

  useEffect(() => {
    repository.testCall()
  }, [])

  return (
    <main>
      <h1>Prueba de servicio</h1>
    </main>
  );
};
