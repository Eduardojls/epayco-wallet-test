import { Input, message, Modal, Space } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { registerClient, RegisterClient } from "./api/client";
import {
  addFunds,
  ConfirmPurchase,
  Funds,
  registerPurchase,
} from "./api/wallet";
import { checkBalance, confirmPurchase } from "./api/wallet/index";

type Inputs = {
  phone?: string;
  documentNumber?: string;
  name?: string;
  email?: string;
  amount?: number;
  token?: string;
  sessionId?: string;
};

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<Inputs>();

  const [isModalOpen, setIsModalOpen] = useState({
    registerUser: false,
    purchase: false,
    addFunds: false,
    confirmPayment: false,
    checkBalance: false,
  });

  const [checkBalanceRef, setCheckBalanceRef] = useState("");

  console.log(JSON.stringify(errors));

  const showModal = (event: React.MouseEventHandler<HTMLElement>) => {
    setIsModalOpen({ ...isModalOpen, [event?.target?.id]: true });
  };

  const handleRegister = (payload: Inputs) => {
    const body: RegisterClient = {
      documentNumber: payload.documentNumber ?? "",
      phone: payload.phone ?? "",
      name: payload.name ?? "",
      email: payload.email ?? "",
    };

    registerClient(body)
      .then((data) => {
        if (data.statusCode == 200 || data.statusCode == 201) {
          messageApi.open({
            type: "success",
            content: data.message,
          });
          setIsModalOpen({ ...isModalOpen, registerUser: false });
        } else {
          messageApi.open({
            type: "error",
            content: data.message,
          });
        }
      })
      .catch((data) =>
        messageApi.open({
          type: "error",
          content: data.message,
        })
      );
  };
  const handlePurchase = (payload: Inputs) => {
    const body: Funds = {
      documentNumber: payload.documentNumber ?? "",
      phone: payload.phone ?? "",
      amount: +payload?.amount!,
    };
    registerPurchase(body)
      .then((data) => {
        if (data.statusCode == 200 || data.statusCode == 201) {
          messageApi.open({
            type: "success",
            content: data.message,
          });
          setIsModalOpen({ ...isModalOpen, purchase: false });
        } else {
          messageApi.open({
            type: "error",
            content: data.message,
          });
        }
      })
      .catch((data) =>
        messageApi.open({
          type: "error",
          content: data.message,
        })
      );
  };
  const handleAddFunds = (payload: Inputs) => {
    const body: Funds = {
      documentNumber: payload.documentNumber ?? "",
      phone: payload.phone ?? "",
      amount: +payload?.amount!,
    };
    addFunds(body)
      .then((data) => {
        if (data.statusCode == 200 || data.statusCode == 201) {
          messageApi.open({
            type: "success",
            content: data.message,
          });
          setIsModalOpen({ ...isModalOpen, addFunds: false });
        } else {
          messageApi.open({
            type: "error",
            content: data.message,
          });
        }
      })
      .catch((data) =>
        messageApi.open({
          type: "error",
          content: data.message,
        })
      );
  };
  const handleConfirmPayment = (payload: Inputs) => {
    const body: ConfirmPurchase = {
      token: payload.token ?? "",
      sessionId: payload.sessionId || "",
    };
    confirmPurchase(body)
      .then((data) => {
        if (data.statusCode == 200 || data.statusCode == 201) {
          messageApi.open({
            type: "success",
            content: data.message,
          });
          setIsModalOpen({ ...isModalOpen, confirmPayment: false });
        } else {
          messageApi.open({
            type: "error",
            content: data.message,
          });
        }
      })
      .catch((data) =>
        messageApi.open({
          type: "error",
          content: data.message,
        })
      );
  };
  const handleCheckBalance = (payload: Inputs) => {
    checkBalance(payload.documentNumber ?? "", payload.phone ?? "")
      .then((data) => {
        if (data.statusCode == 200 || data.statusCode == 201) {
          messageApi.open({
            type: "success",
            content: data.message,
          });
          setCheckBalanceRef( data.data);
        } else {
          messageApi.open({
            type: "error",
            content: data.message,
          });
        }
      })
      .catch((data) =>
        messageApi.open({
          type: "error",
          content: data.message,
        })
      );
  };

  const handleCancel = (event) => {
    setIsModalOpen({ ...isModalOpen, [event]: false });
    reset();
    setCheckBalanceRef("");
  };

  return (
    <>
      {contextHolder}
      {/* <Alert message={data.message} type="success" showIcon />; */}
      <div className="flex flex-wrap gap-4">
        <div
          className="p-32 bg-blue-200 cursor-pointer"
          id="registerUser"
          onClick={showModal}
        >
          Register client
        </div>
        <div
          className="p-32 bg-blue-200 cursor-pointer"
          id="purchase"
          onClick={showModal}
        >
          Purchase
        </div>
        <div
          className="p-32 bg-blue-200 cursor-pointer"
          id="addFunds"
          onClick={showModal}
        >
          Add Funds
        </div>
        <div
          className="p-32 bg-blue-200 cursor-pointer"
          id="confirmPayment"
          onClick={showModal}
        >
          Confirm Payment
        </div>
        <div
          className="p-32 bg-blue-200 cursor-pointer"
          id="checkBalance"
          onClick={showModal}
        >
          Check Balance
        </div>
      </div>
      <Modal
        title="Register User"
        open={isModalOpen.registerUser}
        onOk={handleSubmit(handleRegister)}
        onCancel={() => handleCancel("registerUser")}
        onClose={() => handleCancel("registerUser")}
      >
        <Space direction="vertical" size="large" className="w-full">
          <Controller
            control={control}
            name="name"
            render={({ field }) => <Input placeholder="Name" {...field} />}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field }) => <Input placeholder="Phone" {...field} />}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => <Input placeholder="Email" {...field} />}
          />
          <Controller
            control={control}
            name="documentNumber"
            render={({ field }) => (
              <Input placeholder="Document Number" {...field} />
            )}
          />
        </Space>
      </Modal>
      <Modal
        title="Purchase"
        open={isModalOpen.purchase}
        onOk={handleSubmit(handlePurchase)}
        onCancel={() => handleCancel("purchase")}
        onClose={() => handleCancel("purchase")}
      >
        <Space direction="vertical" size="large" className="w-full">
          <Controller
            control={control}
            name="phone"
            render={({ field }) => <Input placeholder="Phone" {...field} />}
          />
          <Controller
            control={control}
            name="documentNumber"
            render={({ field }) => (
              <Input placeholder="Document Number" {...field} />
            )}
          />
          <Controller
            control={control}
            name="amount"
            render={({ field }) => <Input placeholder="Amount" {...field} />}
          />
        </Space>
      </Modal>
      <Modal
        title="Add Funds"
        open={isModalOpen.addFunds}
        onOk={handleSubmit(handleAddFunds)}
        onCancel={() => handleCancel("addFunds")}
        onClose={() => handleCancel("addFunds")}
      >
        <Space direction="vertical" size="large" className="w-full">
          <Controller
            control={control}
            name="phone"
            render={({ field }) => <Input placeholder="Phone" {...field} />}
          />
          <Controller
            control={control}
            name="documentNumber"
            render={({ field }) => (
              <Input placeholder="Document Number" {...field} />
            )}
          />
          <Controller
            control={control}
            name="amount"
            render={({ field }) => <Input placeholder="Amount" {...field} />}
          />
        </Space>
      </Modal>
      <Modal
        title="Confirm Payment"
        open={isModalOpen.confirmPayment}
        onOk={handleSubmit(handleConfirmPayment)}
        onCancel={() => handleCancel("confirmPayment")}
        onClose={() => handleCancel("confirmPayment")}
      >
        <Space direction="vertical" size="large" className="w-full">
          <Controller
            control={control}
            name="token"
            render={({ field }) => <Input placeholder="Token" {...field} />}
          />
          <Controller
            control={control}
            name="sessionId"
            render={({ field }) => (
              <Input placeholder="Session Id" {...field} />
            )}
          />
        </Space>
      </Modal>
      <Modal
        title="Check Balance"
        open={isModalOpen.checkBalance}
        onOk={handleSubmit(handleCheckBalance)}
        onCancel={() => handleCancel("checkBalance")}
        onClose={() => handleCancel("checkBalance")}
      >
        <Space direction="vertical" size="large" className="w-full">
          <Controller
            control={control}
            name="phone"
            render={({ field }) => <Input placeholder="Phone" {...field} />}
          />
          <Controller
            control={control}
            name="documentNumber"
            render={({ field }) => (
              <Input placeholder="Document Number" {...field} />
            )}
          />

          <h1>Current amount: {checkBalanceRef}$</h1>
        </Space>
      </Modal>
    </>
  );
}

export default App;
