import { Card, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Title, Text, Badge } from '@tremor/react';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/solid';

const mockHistory = [
  { id: 'cdr-001', from: '+905551234567', duration: '125s', date: 'Bugün, 14:32', status: 'Tamamlandı' },
  { id: 'cdr-002', from: '+905559876543', duration: '45s', date: 'Bugün, 11:15', status: 'Tamamlandı' },
  { id: 'cdr-003', from: '+905551112233', duration: '310s', date: 'Dün, 16:05', status: 'Terk Edildi' },
  { id: 'cdr-004', from: '+905554445566', duration: '15s', date: 'Dün, 14:00', status: 'Kaçırıldı' },
];

const statusIcons = {
    'Tamamlandı': { icon: CheckCircleIcon, color: 'emerald' },
    'Terk Edildi': { icon: ClockIcon, color: 'amber' },
    'Kaçırıldı': { icon: XCircleIcon, color: 'rose' },
};

export default function HistoryPage() {
  return (
    <>
      <Title>Çağrı Geçmişi</Title>
      <Text>Tamamlanmış tüm görüşmelerin kayıtları.</Text>
      <Card className="mt-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Durum</TableHeaderCell>
              <TableHeaderCell>Arayan</TableHeaderCell>
              <TableHeaderCell>Süre</TableHeaderCell>
              <TableHeaderCell>Tarih</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockHistory.map((item) => {
              const statusInfo = statusIcons[item.status as keyof typeof statusIcons];
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <Badge color={statusInfo.color} icon={statusInfo.icon}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.from}</TableCell>
                  <TableCell>{item.duration}</TableCell>
                  <TableCell>{item.date}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}