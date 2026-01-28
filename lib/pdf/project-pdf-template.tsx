import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';
import type { ProjectProfile } from '@/types/project';
import { 
  FinancingTable, 
  IncomeProjectionTable, 
  IncomeStatementTable,
  FinancialIndicatorsTable,
  InvestmentRecoveryTableComponent,
  ConclusionsAndSignature,
} from './financial-tables';

// Register fonts (using system fonts for simplicity)
Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
});

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Roboto',
    fontSize: 10,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
    textDecoration: 'underline',
  },
  subsectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 6,
  },
  table: {
    width: '100%',
    border: '1px solid #000',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #000',
  },
  tableCell: {
    padding: 4,
    borderRight: '1px solid #000',
    flex: 1,
    fontSize: 9,
  },
  tableCellLabel: {
    fontWeight: 'bold',
    backgroundColor: '#e0e0e0',
  },
  text: {
    marginBottom: 5,
    lineHeight: 1.4,
    fontSize: 10,
  },
  logo: {
    width: 80,
    height: 80,
    marginVertical: 8,
    alignSelf: 'center',
  },
  tocItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottom: '1px dotted #ccc',
  },
  photo: {
    width: 140,
    height: 140,
    margin: 5,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});

interface ProjectPDFDocumentProps {
  data: ProjectProfile;
}

export const ProjectPDFDocument = ({ data }: ProjectPDFDocumentProps) => {
  const { generalData, businessDescription, valueProposition, team, communicationChannels,
    commercializationChannels, supplyChain, keyPartners, customerSegments, costStructure, annexes } = data;

  // Calculate totals
  const monthlyCostTotal = costStructure?.unitCosts?.reduce((sum, item) => sum + item.totalCost, 0) || 0;
  const annualCostTotal = monthlyCostTotal * 12;

  return (
    <Document>
      {/* Page 1: Cover and General Data */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>PERFIL DE PROYECTO</Text>
        </View>

        <Text style={styles.sectionTitle}>DATOS GENERALES DEL PROYECTO</Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.tableCellLabel]}>
              <Text>Nombre del proyecto:</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{generalData?.projectName}</Text>
            </View>
          </View>

          {generalData?.logo && (
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, styles.tableCellLabel]}>
                <Text>Marca - Logotipo:</Text>
              </View>
              <View style={styles.tableCell}>
                <Image src={generalData.logo} style={styles.logo} />
              </View>
            </View>
          )}

          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.tableCellLabel]}>
              <Text>Nombre completo del representante:</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{generalData?.representativeName}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.tableCellLabel]}>
              <Text>C.I.:</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{generalData?.ci}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.tableCellLabel]}>
              <Text>Género:</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{generalData?.gender}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.tableCellLabel]}>
              <Text>Nacionalidad:</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{generalData?.nationality}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.tableCellLabel]}>
              <Text>Fecha de nacimiento:</Text>
            </View>
            <View style={[styles.tableCell, { flex: 1.5 }]}>
              <Text>{generalData?.birthDate}</Text>
            </View>
            <View style={[styles.tableCell, styles.tableCellLabel]}>
              <Text>Edad:</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>
                {generalData?.birthDate
                  ? new Date().getFullYear() -
                    new Date(generalData.birthDate).getFullYear()
                  : ''}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.tableCellLabel]}>
              <Text>Provincia:</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{generalData?.province}</Text>
            </View>
            <View style={[styles.tableCell, styles.tableCellLabel]}>
              <Text>Cantón:</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{generalData?.canton}</Text>
            </View>
            <View style={[styles.tableCell, styles.tableCellLabel]}>
              <Text>Parroquia:</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{generalData?.parish}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.tableCellLabel]}>
              <Text>Dirección completa:</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{generalData?.address}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.tableCellLabel]}>
              <Text>Correo electrónico:</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{generalData?.email}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.tableCellLabel]}>
              <Text>Nro. Teléfono convencional:</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{generalData?.conventionalPhone || 'S/N'}</Text>
            </View>
            <View style={[styles.tableCell, styles.tableCellLabel]}>
              <Text>Nro. Teléfono celular:</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{generalData?.cellPhone}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.tableCellLabel]}>
              <Text>Dispone de RUC:</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{generalData?.hasRUC ? `Sí - ${generalData.ruc}` : 'No'}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.tableCellLabel]}>
              <Text>Fecha de inicio de actividades:</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{generalData?.startDate}</Text>
            </View>
          </View>
        </View>
      </Page>

      {/* Page 2: Table of Contents */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>PERFIL DE PROYECTO</Text>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 0 }]}>Contenido</Text>

        <View>
          <View style={styles.tocItem}>
            <Text>DATOS GENERALES DEL PROYECTO</Text>
            <Text>1</Text>
          </View>
          <View style={styles.tocItem}>
            <Text>1. DESCRIPCIÓN DEL NEGOCIO</Text>
            <Text>3</Text>
          </View>
          <View style={styles.tocItem}>
            <Text>2. PROPUESTA DE VALOR (CANVAS)</Text>
            <Text>3</Text>
          </View>
          <View style={styles.tocItem}>
            <Text>3. EQUIPO</Text>
            <Text>3</Text>
          </View>
          <View style={styles.tocItem}>
            <Text>4. CANALES DE COMUNICACIÓN (CANVAS)</Text>
            <Text>3</Text>
          </View>
          <View style={styles.tocItem}>
            <Text>5. CANALES DE COMERCIALIZACIÓN (CANVAS)</Text>
            <Text>3</Text>
          </View>
          <View style={styles.tocItem}>
            <Text>6. CADENA DE SUMINISTRO</Text>
            <Text>4</Text>
          </View>
          <View style={styles.tocItem}>
            <Text>7. ESTRUCTURA DE COSTOS</Text>
            <Text>5</Text>
          </View>
          <View style={styles.tocItem}>
            <Text>  7.1 Datos Generales para el Área Financiera</Text>
            <Text>5</Text>
          </View>
          <View style={styles.tocItem}>
            <Text>  7.2 Detalle de Demanda</Text>
            <Text>5</Text>
          </View>
          <View style={styles.tocItem}>
            <Text>  7.3 Equipos y Maquinaria</Text>
            <Text>5</Text>
          </View>
          <View style={styles.tocItem}>
            <Text>  7.4 Costos Unitarios y Totales</Text>
            <Text>6</Text>
          </View>
          <View style={styles.tocItem}>
            <Text>INSUMOS POR PRODUCTO</Text>
            <Text>6+</Text>
          </View>
          <View style={styles.tocItem}>
            <Text>ANEXOS</Text>
            <Text>--</Text>
          </View>
        </View>
      </Page>

      {/* Page 3: Business Details */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>PERFIL DE PROYECTO</Text>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 0 }]}>
          1. DESCRIPCIÓN DEL NEGOCIO
        </Text>
        <Text style={styles.text}>{businessDescription}</Text>

        <Text style={styles.sectionTitle}>2. PROPUESTA DE VALOR</Text>
        <Text style={styles.text}>{valueProposition}</Text>

        <Text style={styles.sectionTitle}>3. EQUIPO</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.tableCellLabel, { flex: 0.3 }]}>
              <Text>N°</Text>
            </View>
            <View style={[styles.tableCell, styles.tableCellLabel]}>
              <Text>Nombre y Apellido</Text>
            </View>
            <View style={[styles.tableCell, styles.tableCellLabel]}>
              <Text>Experiencia</Text>
            </View>
            <View style={[styles.tableCell, styles.tableCellLabel]}>
              <Text>Rol dentro del proyecto</Text>
            </View>
          </View>
          {team?.map((member, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={[styles.tableCell, { flex: 0.3 }]}>
                <Text>{index + 1}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{member.name}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{member.experience}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{member.role}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>4. CANALES DE COMUNICACIÓN (CANVAS)</Text>
        <Text style={styles.text}>{communicationChannels}</Text>

        <Text style={styles.sectionTitle}>
          5. CANALES DE COMERCIALIZACIÓN (CANVAS)
        </Text>
        <Text style={styles.text}>{commercializationChannels}</Text>
      </Page>

      {/* Page 4: Supply Chain and Partners */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>PERFIL DE PROYECTO</Text>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 0 }]}>
          6. CADENA DE SUMINISTRO
        </Text>
        <Text style={styles.text}>{supplyChain}</Text>

        <Text style={styles.sectionTitle}>SOCIOS CLAVE</Text>
        <Text style={styles.text}>{keyPartners}</Text>

        <Text style={styles.sectionTitle}>SEGMENTOS DE CLIENTES</Text>
        <Text style={styles.text}>{customerSegments}</Text>
      </Page>

      {/* Page 5: Cost Structure - Financial Data */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>PERFIL DE PROYECTO</Text>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 0 }]}>7. ESTRUCTURA DE COSTOS</Text>
        
        {/* 7.1 Financial Rates */}
        <Text style={styles.subsectionTitle}>7.1 DATOS GENERALES PARA EL ÁREA FINANCIERA</Text>
        {costStructure?.financialRates && (
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, styles.tableCellLabel, { flex: 2 }]}>
                <Text>VARIABLE</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellLabel]}>
                <Text>INDICADOR</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, { flex: 2 }]}>
                <Text>TASA DE CRECIMIENTO DE LA PRODUCCIÓN</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{costStructure.financialRates.productionGrowth}%</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, { flex: 2 }]}>
                <Text>TASA DE CRECIMIENTO DEL PRECIO DE VENTA AL PÚBLICO</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{costStructure.financialRates.priceGrowth}%</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, { flex: 2 }]}>
                <Text>TASA DE DESCUENTO</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{costStructure.financialRates.discountRate}%</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, { flex: 2 }]}>
                <Text>TASA DE INFLACIÓN</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{costStructure.financialRates.inflationRate}%</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, { flex: 2 }]}>
                <Text>TASA DE INCREMENTO DE SUELDO Y SALARIOS</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{costStructure.financialRates.salaryIncrease}%</Text>
              </View>
            </View>
          </View>
        )}

        {/* 7.2 Demand Detail */}
        <Text style={styles.subsectionTitle}>7.2 DETALLE DE DEMANDA</Text>
        {costStructure?.demandDetails && costStructure.demandDetails.length > 0 && (
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, styles.tableCellLabel, { flex: 2 }]}>
                <Text>DESCRIPCIÓN</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellLabel]}>
                <Text>DEMANDA EFECTIVA MENSUAL</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellLabel]}>
                <Text>PVP</Text>
              </View>
            </View>
            {costStructure.demandDetails.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={[styles.tableCell, { flex: 2 }]}>
                  <Text>{item.productName}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{item.monthlyDemand}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>${item.pvp.toFixed(2)}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* 7.3 Equipment */}
        <Text style={styles.subsectionTitle}>7.3 DETALLE DE EQUIPOS Y MAQUINARIA</Text>
        {costStructure?.equipment && costStructure.equipment.length > 0 && (
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, styles.tableCellLabel, { flex: 2 }]}>
                <Text>DESCRIPCIÓN</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellLabel]}>
                <Text>CANTIDAD ANUAL</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellLabel]}>
                <Text>PRECIO UNITARIO</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellLabel]}>
                <Text>COSTO TOTAL</Text>
              </View>
            </View>
            {costStructure.equipment.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={[styles.tableCell, { flex: 2 }]}>
                  <Text>{item.description}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{item.annualQuantity}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>${item.unitPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>${item.totalCost.toFixed(2)}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </Page>

      {/* Page 6: Cost Structure - Unit Costs & Totals */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>PERFIL DE PROYECTO</Text>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 0 }]}>7. ESTRUCTURA DE COSTOS (cont.)</Text>
        
        {/* 7.4 Unit Costs and Totals */}
        <Text style={styles.subsectionTitle}>7.4 COSTOS UNITARIOS Y TOTALES DE LA PRODUCCIÓN O PRESTACIÓN DE SERVICIOS</Text>
        {costStructure?.unitCosts && costStructure.unitCosts.length > 0 && (
          <>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, styles.tableCellLabel, { flex: 2 }]}>
                  <Text>PRODUCTOS O SERVICIOS (MENSUALES)</Text>
                </View>
                <View style={[styles.tableCell, styles.tableCellLabel]}>
                  <Text>UNIDAD</Text>
                </View>
                <View style={[styles.tableCell, styles.tableCellLabel]}>
                  <Text>CANTIDAD</Text>
                </View>
                <View style={[styles.tableCell, styles.tableCellLabel]}>
                  <Text>PRECIO UNITARIO</Text>
                </View>
                <View style={[styles.tableCell, styles.tableCellLabel]}>
                  <Text>COSTO TOTAL</Text>
                </View>
              </View>
              {costStructure.unitCosts.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <View style={[styles.tableCell, { flex: 2 }]}>
                    <Text>{item.productName}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{item.unit}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{item.quantity}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>${item.unitPrice.toFixed(4)}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>${item.totalCost.toFixed(2)}</Text>
                  </View>
                </View>
              ))}
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, styles.tableCellLabel, { flex: 4 }]}>
                  <Text>COSTO TOTAL MENSUAL</Text>
                </View>
                <View style={[styles.tableCell, styles.tableCellLabel]}>
                  <Text>${monthlyCostTotal.toFixed(2)}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, styles.tableCellLabel, { flex: 4 }]}>
                  <Text>12 MESES DEL AÑO</Text>
                </View>
                <View style={[styles.tableCell, styles.tableCellLabel]}>
                  <Text>${annualCostTotal.toFixed(2)}</Text>
                </View>
              </View>
            </View>
          </>
        )}

        {/* 7.5 Financing Structure */}
        {costStructure?.financingStructure && (
          <FinancingTable financingStructure={costStructure.financingStructure} />
        )}

        {/* 7.6 Income Projection */}
        {costStructure?.incomeProjection && (
          <IncomeProjectionTable incomeProjection={costStructure.incomeProjection} />
        )}

        {/* 7.7 Income Statement */}
        {costStructure?.incomeStatementProjection && (
          <IncomeStatementTable incomeStatementProjection={costStructure.incomeStatementProjection} />
        )}

        {/* 7.8 Financial Indicators */}
        {costStructure?.financialIndicators && (
          <FinancialIndicatorsTable financialIndicators={costStructure.financialIndicators} />
        )}

        {/* 7.9 Investment Recovery Table */}
        {costStructure?.investmentRecoveryTable && (
          <InvestmentRecoveryTableComponent investmentRecoveryTable={costStructure.investmentRecoveryTable} />
        )}

        {costStructure?.administrativeProvisions && (
          <>
            <Text style={styles.subsectionTitle}>PROVISIONES DE GASTOS ADMINISTRATIVOS Y VENTAS</Text>
            <Text style={styles.text}>{costStructure.administrativeProvisions}</Text>
          </>
        )}
      </Page>

      {/* Pages for Product Inputs (one page per product) */}
      {costStructure?.productCostDetails?.map((product, productIndex) => (
        <Page key={productIndex} size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>PERFIL DE PROYECTO</Text>
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 0 }]}>
            PRODUCTO {productIndex + 1}: {product.productName.toUpperCase()}
          </Text>

          <Text style={styles.subsectionTitle}>INSUMOS AL MES DEL PRODUCTO</Text>
          
          {product.inputs && product.inputs.length > 0 && (
            <>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, styles.tableCellLabel, { flex: 2 }]}>
                    <Text>INSUMO</Text>
                  </View>
                  <View style={[styles.tableCell, styles.tableCellLabel]}>
                    <Text>UNIDAD</Text>
                  </View>
                  <View style={[styles.tableCell, styles.tableCellLabel]}>
                    <Text>CANTIDAD</Text>
                  </View>
                  <View style={[styles.tableCell, styles.tableCellLabel]}>
                    <Text>PRECIO UNITARIO</Text>
                  </View>
                  <View style={[styles.tableCell, styles.tableCellLabel]}>
                    <Text>COSTO TOTAL</Text>
                  </View>
                </View>
                {product.inputs.map((input, inputIndex) => (
                  <View key={inputIndex} style={styles.tableRow}>
                    <View style={[styles.tableCell, { flex: 2 }]}>
                      <Text>{input.name}</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text>{input.unit}</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text>{input.quantity}</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text>${input.unitPrice.toFixed(2)}</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text>${input.totalCost.toFixed(2)}</Text>
                    </View>
                  </View>
                ))}
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, styles.tableCellLabel, { flex: 4 }]}>
                    <Text>COSTO TOTAL</Text>
                  </View>
                  <View style={[styles.tableCell, styles.tableCellLabel]}>
                    <Text>${product.inputs.reduce((sum, input) => sum + input.totalCost, 0).toFixed(2)}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, styles.tableCellLabel, { flex: 4 }]}>
                    <Text>COSTO UNITARIO</Text>
                  </View>
                  <View style={[styles.tableCell, styles.tableCellLabel]}>
                    <Text>${product.unitCost.toFixed(4)}</Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </Page>
      ))}

      {/* Conclusions and Signature Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>PERFIL DE PROYECTO</Text>
        </View>
        
        <ConclusionsAndSignature projectData={data} />
      </Page>

      {/* Page: Annexes */}
      {annexes && (annexes.photos.length > 0 || annexes.documents.length > 0) && (
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>PERFIL DE PROYECTO</Text>
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 0 }]}>ANEXOS</Text>

          {annexes.photos.length > 0 && (
            <>
              <Text style={[styles.text, { fontWeight: 'bold' }]}>
                EVIDENCIA FOTOGRÁFICA
              </Text>
              <View style={styles.photoGrid}>
                {annexes.photos.slice(0, 6).map((photo, index) => (
                  <Image key={index} src={photo} style={styles.photo} />
                ))}
              </View>
            </>
          )}

          {annexes.documents.length > 0 && (
            <>
              <Text style={[styles.text, { fontWeight: 'bold', marginTop: 15 }]}>
                DOCUMENTOS DE RESPALDO
              </Text>
              <Text style={styles.text}>
                {annexes.documents.length} documento(s) adjunto(s)
              </Text>
            </>
          )}
        </Page>
      )}
    </Document>
  );
};
