import imaplib
import os
from dotenv import load_dotenv

def serch_creditcard_bill(month, year):
    months = {
        1: 'Janeiro',
        2: 'Fevereiro',
        3: 'Março',
        4: 'Abril',
        5: 'Maio',
        6: 'Junho',
        7: 'Julho',
        8: 'Agosto',
        9: 'Setembro',
        10: 'Outubro',
        11: 'Novembro',
        12: 'Dezembro'
    }
    subject = f'Fatura por e-mail - {months[month]}/{year}'
    load_dotenv();
    username = os.getenv('EMAIL');
    password = os.getenv('SENHA');
    imap_server = 'outlook.office365.com';

    mail = imaplib.IMAP4_SSL(imap_server);
    mail.login(username, password);
    mail.select('inbox');

    status, messages = mail.search(None, f'(SUBJECT "{subject}")')
    if status == 'OK':
        messages_ids = messages[0].split()
        for msg_id in messages_ids:
            status, msg = mail.fetch(msg_id, '(RFC822)')
            if status == 'OK':
                all_msg = msg[0][1].decode('utf-8').split(' ');
                index = 0;
                index_value = 0;
                index_date = 0;
                for fragment in all_msg:
                    if 'R$' in fragment:
                        index_value = index + 1;
                    if 'vencimento' in fragment:
                        index_date = index + 6;
                        break;
                    index += 1;
                date = all_msg[index_date].split('>')[1].split('<')[0];
                date = date[6:] + '-' + date[3:5] + '-' + date[0:2];

                return {'Value': all_msg[index_value].split('<')[0], 'Date': date}

        mail.close()

    mail.logout()

print(serch_creditcard_bill(10,2023));
