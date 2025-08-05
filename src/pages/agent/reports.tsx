import { Card, Title, Text, BarChart, DonutChart, Legend, Grid, Col } from '@tremor/react';

const weeklyCallData = [
  { date: 'Pzt', 'Gelen Çağrı': 32, 'Cevaplanan': 30, 'Kaçan': 2 },
  { date: 'Sal', 'Gelen Çağrı': 45, 'Cevaplanan': 41, 'Kaçan': 4 },
  { date: 'Çar', 'Gelen Çağrı': 38, 'Cevaplanan': 38, 'Kaçan': 0 },
  { date: 'Per', 'Gelen Çağrı': 52, 'Cevaplanan': 48, 'Kaçan': 4 },
  { date: 'Cum', 'Gelen Çağrı': 61, 'Cevaplanan': 55, 'Kaçan': 6 },
];

const callTypesData = [
    { name: 'Satış', value: 980 },
    { name: 'Destek', value: 456 },
    { name: 'Bilgi', value: 390 },
    { name: 'Diğer', value: 120 },
];

const valueFormatter = (number: number) => `${Intl.NumberFormat('us').format(number).toString()}`;

export default function ReportsPage() {
  return (
    <>
      <Title>Ajan Performans Raporları</Title>
      <Text>Haftalık çağrı metrikleri ve analizler.</Text>

      <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
        <Col numColSpanMd={2} numColSpanLg={3}>
            <Card>
                <Title>Haftalık Çağrı Hacmi</Title>
                <BarChart
                className="mt-6"
                data={weeklyCallData}
                index="date"
                categories={['Cevaplanan', 'Kaçan']}
                colors={['blue', 'red']}
                valueFormatter={valueFormatter}
                yAxisWidth={48}
                stack={true}
                />
            </Card>
        </Col>
        <Card>
            <Title>Çağrı Türü Dağılımı</Title>
            <DonutChart
                className="mt-6"
                data={callTypesData}
                category="value"
                index="name"
                valueFormatter={valueFormatter}
                colors={['cyan', 'violet', 'amber', 'rose']}
            />
            <Legend
                categories={['Satış', 'Destek', 'Bilgi', 'Diğer']}
                colors={['cyan', 'violet', 'amber', 'rose']}
                className="mt-6"
            />
        </Card>
        {/* Buraya yeni metrik kartları eklenebilir */}
      </Grid>
    </>
  );
}