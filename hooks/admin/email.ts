import { message } from "antd";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { userFetcherWithAuth } from "../../helpers";
import { queryClient } from "../../pages/_app";
import { SEND_EMAILS } from "../../store/admin/admin.queries";

interface ISendEmail {
  subject: string;
  template: string;
  token: string;
  userList: string[];
}

export const useAdminSendEmails = (token: string) => {
  const router = useRouter();

  

  return useMutation((payload: ISendEmail) => userFetcherWithAuth(SEND_EMAILS, payload, token), {
    onSuccess: data => {
      if (!data.sendEmailToUsers.status) {
        message.error({ content: data.sendEmailToUsers.message, key: "email", duration: 2.5 });
        throw Error(data.sendEmailToUsers.message);
      } else {
        message.success({ content: data.sendEmailToUsers.message });
        router.push("/admin/marketing/coupon-list");
      }

      queryClient.invalidateQueries("admin-coupon");
    },
  });
};
