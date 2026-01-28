import { Text, View, StyleSheet } from '@react-pdf/renderer';
import type {
  FinancingStructure,
  IncomeProjection,
  CostsExpensesProjection,
  IncomeStatementProjection,
  FinancialIndicators,
  InvestmentRecoveryTable,
} from '@/types/project';

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 6,
  },
  subsectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  table: {
    width: '100%',
    marginTop: 6,
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1pt solid #ddd',
  },
  tableCell: {
    flex: 1,
    padding: 3,
    fontSize: 7,
    borderRight: '1pt solid #ddd',
  },
  tableCellLabel: {
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
  },
  tableCellCenter: {
    textAlign: 'center',
  },
  text: {
    fontSize: 8,
    marginBottom: 4,
    lineHeight: 1.4,
  },
});

interface FinancingTableProps {
  financingStructure: FinancingStructure;
}

export function FinancingTable({ financingStructure }: FinancingTableProps) {
  const { items, totalInvestment, participationPercentage } = financingStructure;

  return (
    <>
      <Text style={styles.subsectionTitle}>7.5 ESTRUCTURA DEL FINANCIAMIENTO</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.tableCellLabel, { flex: 2 }]}>
            <Text>DESCRIPCIÓN</Text>
          </View>
          <View style={[styles.tableCell, styles.tableCellLabel]}>
            <Text>INVERSIÓN</Text>
          </View>
          <View style={[styles.tableCell, styles.tableCellLabel, { flex: 2 }]}>
            <Text>FUENTE</Text>
          </View>
          <View style={[styles.tableCell, styles.tableCellLabel, { flex: 0.6 }]}>
            <Text>PROPIA</Text>
          </View>
          <View style={[styles.tableCell, styles.tableCellLabel, { flex: 0.8 }]}>
            <Text>DONACIÓN</Text>
          </View>
          <View style={[styles.tableCell, styles.tableCellLabel, { flex: 0.8 }]}>
            <Text>PRÉSTAMO</Text>
          </View>
        </View>

        {items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <View style={[styles.tableCell, { flex: 2 }]}>
              <Text>{item.description}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>${item.investment.toFixed(2)}</Text>
            </View>
            <View style={[styles.tableCell, { flex: 2 }]}><Text> </Text></View>
            <View style={[styles.tableCell, styles.tableCellCenter, { flex: 0.6 }]}>
              <Text>{item.ownSource ? 'X' : ''}</Text>
            </View>
            <View style={[styles.tableCell, styles.tableCellCenter, { flex: 0.8 }]}>
              <Text>{item.donationSource ? 'X' : ''}</Text>
            </View>
            <View style={[styles.tableCell, styles.tableCellCenter, { flex: 0.8 }]}>
              <Text>{item.loanSource ? 'X' : ''}</Text>
            </View>
          </View>
        ))}

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.tableCellLabel, { flex: 2 }]}>
            <Text>FINANCIAMIENTO TOTAL</Text>
          </View>
          <View style={[styles.tableCell, styles.tableCellLabel]}>
            <Text>${totalInvestment.toFixed(2)}</Text>
          </View>
          <View style={[styles.tableCell, { flex: 3.2 }]}><Text> </Text></View>
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.tableCellLabel, { flex: 2 }]}>
            <Text>% PARTICIPACIÓN</Text>
          </View>
          <View style={[styles.tableCell, styles.tableCellLabel]}>
            <Text>{participationPercentage.toFixed(2)}%</Text>
          </View>
          <View style={[styles.tableCell, { flex: 3.2 }]}><Text> </Text></View>
        </View>
      </View>
    </>
  );
}

interface IncomeProjectionTableProps {
  incomeProjection: IncomeProjection;
}

export function IncomeProjectionTable({ incomeProjection }: IncomeProjectionTableProps) {
  const { years } = incomeProjection;

  return (
    <>
      <Text style={styles.subsectionTitle}>7.6 PROYECCIÓN DE INGRESOS</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.tableCellLabel, { flex: 2 }]}>
            <Text>DESCRIPCIÓN</Text>
          </View>
          {years.map((year) => (
            <View key={year.year} style={[styles.tableCell, styles.tableCellLabel]}>
              <Text>AÑO {year.year}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.tableCellLabel, { flex: 2 }]}>
            <Text>ENTRADAS</Text>
          </View>
          {years.map((year) => (
            <View key={year.year} style={styles.tableCell}>
              <Text>${year.entries.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 2 }]}>
            <Text>VENTAS</Text>
          </View>
          {years.map((year) => (
            <View key={year.year} style={styles.tableCell}>
              <Text>${year.sales.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 2 }]}>
            <Text>APORTE DE CAPITAL</Text>
          </View>
          {years.map((year) => (
            <View key={year.year} style={styles.tableCell}>
              <Text>${year.capitalContribution.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 2 }]}>
            <Text>PRÉSTAMO</Text>
          </View>
          {years.map((year) => (
            <View key={year.year} style={styles.tableCell}>
              <Text>${year.loan.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.tableCellLabel, { flex: 2 }]}>
            <Text>SALIDAS</Text>
          </View>
          {years.map((year) => (
            <View key={year.year} style={styles.tableCell}>
              <Text>${year.exits.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.tableCellLabel, { flex: 2 }]}>
            <Text>PARA INVERSIÓN</Text>
          </View>
          {years.map((year) => (
            <View key={year.year} style={styles.tableCell}>
              <Text>${year.forInvestment.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 2 }]}>
            <Text>CAPITAL DE TRABAJO</Text>
          </View>
          {years.map((year) => (
            <View key={year.year} style={styles.tableCell}>
              <Text>${year.workingCapital.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 2 }]}>
            <Text>ACTIVO FIJO</Text>
          </View>
          {years.map((year) => (
            <View key={year.year} style={styles.tableCell}>
              <Text>${year.fixedAsset.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 2 }]}>
            <Text>ACTIVO DIFERIDO</Text>
          </View>
          {years.map((year) => (
            <View key={year.year} style={styles.tableCell}>
              <Text>${year.deferredAsset.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 2 }]}>
            <Text>OTROS ACTIVOS</Text>
          </View>
          {years.map((year) => (
            <View key={year.year} style={styles.tableCell}>
              <Text>${year.otherAssets.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.tableCellLabel, { flex: 2 }]}>
            <Text>PARA COSTOS Y GASTOS</Text>
          </View>
          {years.map((year) => (
            <View key={year.year} style={styles.tableCell}>
              <Text>${year.forCostsAndExpenses.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
}

interface IncomeStatementTableProps {
  incomeStatementProjection: IncomeStatementProjection;
}

export function IncomeStatementTable({ incomeStatementProjection }: IncomeStatementTableProps) {
  const { years } = incomeStatementProjection;

  return (
    <>
      <Text style={styles.subsectionTitle}>7.7 PROYECCIÓN DE ESTADO DE RESULTADOS</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.tableCellLabel, { flex: 2 }]}>
            <Text>DESCRIPCIÓN</Text>
          </View>
          {years.map((year) => (
            <View key={year.year} style={[styles.tableCell, styles.tableCellLabel]}>
              <Text>AÑO {year.year}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.tableCellLabel, { flex: 2 }]}>
            <Text>INGRESOS</Text>
          </View>
          {years.map((year) => (
            <View key={year.year} style={styles.tableCell}>
              <Text>${year.income.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 2 }]}>
            <Text>INGRESOS OPERATIVOS</Text>
          </View>
          {years.map((year) => (
            <View key={year.year} style={styles.tableCell}>
              <Text>${year.operativeIncome.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 2 }]}>
            <Text>VENTAS</Text>
          </View>
          {years.map((year) => (
            <View key={year.year} style={styles.tableCell}>
              <Text>${year.sales.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.tableCellLabel, { flex: 2 }]}>
            <Text>GASTOS OPERATIVOS</Text>
          </View>
          {years.map((year) => (
            <View key={year.year} style={styles.tableCell}>
              <Text>${year.operativeExpenses.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 2 }]}>
            <Text>TOTAL</Text>
          </View>
          {years.map((year) => (
            <View key={year.year} style={styles.tableCell}>
              <Text>${year.total.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 2 }]}>
            <Text>GASTO SUELDOS Y SALARIOS</Text>
          </View>
          {years.map((year) => (
            <View key={year.year} style={styles.tableCell}>
              <Text>${year.salariesWages.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 2 }]}>
            <Text>GASTO SERVICIOS BÁSICOS</Text>
          </View>
          {years.map((year) => (
            <View key={year.year} style={styles.tableCell}>
              <Text>${year.basicServices.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 2 }]}>
            <Text>GASTO COMBUSTIBLE</Text>
          </View>
          {years.map((year) => (
            <View key={year.year} style={styles.tableCell}>
              <Text>${year.fuel.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 2 }]}>
            <Text>GASTO TRANSPORTE</Text>
          </View>
          {years.map((year) => (
            <View key={year.year} style={styles.tableCell}>
              <Text>${year.transport.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 2 }]}>
            <Text>GASTO ARRIENDO</Text>
          </View>
          {years.map((year) => (
            <View key={year.year} style={styles.tableCell}>
              <Text>${year.rent.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 2 }]}>
            <Text>GASTO PUBLICIDAD</Text>
          </View>
          {years.map((year) => (
            <View key={year.year} style={styles.tableCell}>
              <Text>${year.advertising.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 2 }]}>
            <Text>OTROS GASTOS</Text>
          </View>
          {years.map((year) => (
            <View key={year.year} style={styles.tableCell}>
              <Text>${year.otherExpenses.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 2 }]}>
            <Text>GASTO DEPRECIACIÓN</Text>
          </View>
          {years.map((year) => (
            <View key={year.year} style={styles.tableCell}>
              <Text>${year.depreciationExpense.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 2 }]}>
            <Text>GASTO AMORTIZACIÓN</Text>
          </View>
          {years.map((year) => (
            <View key={year.year} style={styles.tableCell}>
              <Text>${year.amortizationExpense.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
}

interface FinancialIndicatorsTableProps {
  financialIndicators: FinancialIndicators;
}

export function FinancialIndicatorsTable({ financialIndicators }: FinancialIndicatorsTableProps) {
  const { van, tir, bc, pr } = financialIndicators;

  return (
    <>
      <Text style={styles.subsectionTitle}>7.8 INDICADORES FINANCIEROS</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.tableCellLabel, { flex: 2 }]}>
            <Text>INDICADORES</Text>
          </View>
          <View style={[styles.tableCell, styles.tableCellLabel]}>
            <Text>VALOR</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 2 }]}>
            <Text>VALOR ACTUAL NE TO (VAN)</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>${van.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 2 }]}>
            <Text>RELACIÓN BENEFICIO-COSTO (B/C)</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>{bc.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 2 }]}>
            <Text>TASA INTERNA DE RETORNO (TIR)</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>{tir.toFixed(2)}%</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 2 }]}>
            <Text>PERÍODO DE RECUPERACIÓN DE LA INVERSIÓN (PR)</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>{pr}</Text>
          </View>
        </View>
      </View>
    </>
  );
}

interface InvestmentRecoveryTableComponentProps {
  investmentRecoveryTable: InvestmentRecoveryTable;
}

export function InvestmentRecoveryTableComponent({ investmentRecoveryTable }: InvestmentRecoveryTableComponentProps) {
  const { years } = investmentRecoveryTable;
  const totalInvestment = Math.abs(years[0]?.netCashFlow || 0);

  return (
    <>
      <Text style={styles.subsectionTitle}>
        7.9 TABLA: RECUPERACIÓN ACUMULADA DE LA INVERSIÓN (simple, no descontada)
      </Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.tableCellLabel]}>
            <Text>AÑO</Text>
          </View>
          <View style={[styles.tableCell, styles.tableCellLabel, { flex: 2 }]}>
            <Text>FLUJO NETO DEL AÑO (USD)</Text>
          </View>
          <View style={[styles.tableCell, styles.tableCellLabel, { flex: 2 }]}>
            <Text>ACUMULADO RECUPERADO (USD)</Text>
          </View>
          <View style={[styles.tableCell, styles.tableCellLabel, { flex: 2 }]}>
            <Text>SALDO POR RECUPERAR (USD)</Text>
          </View>
        </View>

        {years.map((year) => (
          <View key={year.year} style={styles.tableRow}>
            <View style={[styles.tableCell, styles.tableCellCenter]}>
              <Text>{year.year}</Text>
            </View>
            <View style={[styles.tableCell, { flex: 2 }]}>
              <Text style={{ color: year.netCashFlow < 0 ? 'red' : 'black' }}>
                ${year.netCashFlow.toFixed(2)}
              </Text>
            </View>
            <View style={[styles.tableCell, { flex: 2 }]}>
              <Text>${year.accumulatedRecovered.toFixed(2)}</Text>
            </View>
            <View style={[styles.tableCell, { flex: 2 }]}>
              <Text>${year.remainingBalance.toFixed(2)}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Interpretation Text */}
      <Text style={[styles.text, { marginTop: 8, fontWeight: 'bold' }]}>Interpretación:</Text>
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.text}>
          • La inversión inicial requerida para el proyecto es de ${totalInvestment.toFixed(2)}.
        </Text>
        <Text style={styles.text}>
          • A partir del primer año, los flujos netos generados por el negocio se van acumulando,
          reduciendo el saldo pendiente por recuperar.
        </Text>
        {years.some((y) => y.accumulatedRecovered >= 0) ? (
          <>
            <Text style={styles.text}>
              • Al finalizar el año {years.findIndex((y) => y.accumulatedRecovered >= 0)}, el negocio ha
              recuperado ${Math.abs(years.find((y) => y.accumulatedRecovered >= 0)?.accumulatedRecovered || 0).toFixed(2)}.
            </Text>
            <Text style={styles.text}>
              • Esto indica que el período de recuperación de la inversión (PR) es de aproximadamente{' '}
              {years.findIndex((y) => y.accumulatedRecovered >= 0)} años, lo que representa un retorno
              favorable en el corto a mediano plazo.
            </Text>
          </>
        ) : (
          <Text style={styles.text}>
            • Esto indica que el período de recuperación de la inversión (PR) es mayor a 5 años, lo que
            representa un riesgo para los inversionistas en términos de liquidez y retorno en el corto
            plazo.
          </Text>
        )}
      </View>
    </>
  );
}

interface ConclusionsAndSignatureProps {
  projectData: {
    generalData: { representativeName: string; projectName: string };
    costStructure?: {
      financialIndicators?: FinancialIndicators;
      investmentRecoveryTable?: InvestmentRecoveryTable;
    };
  };
}

export function ConclusionsAndSignature({ projectData }: ConclusionsAndSignatureProps) {
  const { representativeName } = projectData.generalData;
  const indicators = projectData.costStructure?.financialIndicators;
  const recovery = projectData.costStructure?.investmentRecoveryTable;
  const totalInvestment = recovery ? Math.abs(recovery.years[0]?.netCashFlow || 0) : 0;
  const finalRecovered = recovery ? recovery.years[recovery.years.length - 1]?.accumulatedRecovered : 0;
  const prYears = indicators?.pr || 'mayor a 5 años';

  return (
    <>
      <Text style={styles.sectionTitle}>CONCLUSIONES</Text>
      <Text style={styles.text}>
        El análisis del flujo de caja proyectado revela que, con los flujos netos estimados, el negocio{' '}
        {finalRecovered && finalRecovered >= 0
          ? `consigue recuperar su inversión inicial en los cinco años previstos de operación. Al cierre del quinto año, se ha recuperado una parte significativa de la inversión (${Math.abs(finalRecovered).toFixed(2)})`
          : `no consigue recuperar su inversión inicial en los cinco años previstos de operación. Al cierre del quinto año, aún queda una porción significativa de la inversión por recuperar (${Math.abs(totalInvestment + (finalRecovered || 0)).toFixed(2)})`
        }.
      </Text>

      <Text style={styles.text}>
        Esto sugiere que el Período de Recuperación (PR) es {prYears}, lo que representa{' '}
        {prYears.includes('MAYOR') || prYears === 'mayor a 5 años'
          ? 'un riesgo para los inversionistas en términos de liquidez y retorno en el corto plazo'
          : 'un retorno favorable para los inversionistas'
        }.
      </Text>

      <Text style={styles.text}>
        Para mejorar la viabilidad del proyecto, se recomienda revisar estrategias de ventas, optimizar
        costos y evaluar alternativas de financiamiento con mejores condiciones, con el fin de reducir el
        tiempo necesario para recuperar la inversión y mejorar la rentabilidad del negocio.
      </Text>

      <Text style={[styles.text, { marginTop: 8 }]}>
        El presente informe ha sido elaborado con información proporcionada por el emprendedor, quien es el
        único responsable por la veracidad de esta. La Universidad Tecnológica Indoamérica no se
        responsabiliza por datos erróneos, incorrectos o alterados, que pudieran modificar los resultados
        del análisis.
      </Text>

      <Text style={[styles.text, { marginTop: 12, fontWeight: 'bold' }]}>
        Fecha de finalización del perfil del proyecto
      </Text>
      <Text style={styles.text}>
        Quito, {new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' })}
      </Text>

      {/* Signature Area */}
      <View style={{ marginTop: 30, alignItems: 'center' }}>
        <View
          style={{
            width: 200,
            height: 60,
            borderBottom: '1pt solid black',
            marginBottom: 4,
          }}
        />
        <Text style={[styles.text, { fontWeight: 'bold', textAlign: 'center' }]}>
          FIRMA EMPRENDEDOR
        </Text>
      </View>
    </>
  );
}
