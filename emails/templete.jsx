import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export default function EmailTemplate({
  userName = "",
  type = "monthly-report",
  data = {},
}) {
  const cardStyle = {
    backgroundColor: "#112240",
    border: "1px solid rgba(45,212,191,0.15)",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "16px",
  };

  const statValue = {
    fontSize: "28px",
    fontWeight: "700",
    color: "#2dd4bf",
    margin: "8px 0 0",
  };

  if (type === "monthly-report") {
    return (
      <Html>
        <Head />
        <Preview>Your FlowMint Monthly Financial Report</Preview>

        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.logo}>FlowMint</Heading>

            <Heading style={styles.title}>Monthly Financial Report</Heading>

            <Text style={styles.text}>Hello {userName},</Text>

            <Text style={styles.text}>
              Here's your financial summary for <strong>{data?.month}</strong>.
            </Text>

            {/* MAIN STATS */}

            <Section style={cardStyle}>
              <Text style={styles.label}>Total Income</Text>

              <Text style={statValue}>
                ₹{data?.stats?.totalIncome?.toLocaleString()}
              </Text>
            </Section>

            <Section style={cardStyle}>
              <Text style={styles.label}>Total Expenses</Text>

              <Text
                style={{
                  ...statValue,
                  color: "#f87171",
                }}
              >
                ₹{data?.stats?.totalExpenses?.toLocaleString()}
              </Text>
            </Section>

            <Section style={cardStyle}>
              <Text style={styles.label}>Net Savings</Text>

              <Text
                style={{
                  ...statValue,
                  color: "#34d399",
                }}
              >
                ₹
                {(
                  data?.stats?.totalIncome - data?.stats?.totalExpenses
                ).toLocaleString()}
              </Text>
            </Section>

            {/* CATEGORY BREAKDOWN */}

            {data?.stats?.byCategory && (
              <Section style={styles.section}>
                <Heading style={styles.sectionTitle}>Expense Breakdown</Heading>

                {Object.entries(data.stats.byCategory).map(
                  ([category, amount]) => (
                    <div key={category} style={styles.row}>
                      <Text style={styles.category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </Text>

                      <Text style={styles.amount}>
                        ₹{amount.toLocaleString()}
                      </Text>
                    </div>
                  ),
                )}
              </Section>
            )}

            {/* AI INSIGHTS */}

            {data?.insights?.length > 0 && (
              <Section style={styles.section}>
                <Heading style={styles.sectionTitle}>AI Insights</Heading>

                {data.insights.map((insight, index) => (
                  <Text key={index} style={styles.insight}>
                    • {insight}
                  </Text>
                ))}
              </Section>
            )}

            <Text style={styles.footer}>
              Powered by FlowMint AI • Track smarter. Save better.
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }

  if (type === "budget-alert") {
    return (
      <Html>
        <Head />
        <Preview>FlowMint Budget Alert</Preview>

        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.logo}>FlowMint</Heading>

            <Heading style={styles.alertTitle}>Budget Alert</Heading>

            <Text style={styles.text}>Hello {userName},</Text>

            <Text style={styles.text}>
              You have used <strong>{data?.percentageUsed?.toFixed(1)}%</strong>{" "}
              of your monthly budget.
            </Text>

            <Section style={styles.alertBox}>
              <Text style={styles.alertValue}>
                {data?.percentageUsed?.toFixed(1)}%
              </Text>

              <Text style={styles.alertText}>Budget Consumed</Text>
            </Section>

            <Section style={cardStyle}>
              <Text style={styles.label}>Budget Amount</Text>

              <Text style={statValue}>
                ₹{data?.budgetAmount?.toLocaleString()}
              </Text>
            </Section>

            <Section style={cardStyle}>
              <Text style={styles.label}>Spent So Far</Text>

              <Text
                style={{
                  ...statValue,
                  color: "#f87171",
                }}
              >
                ₹{data?.totalExpenses?.toLocaleString()}
              </Text>
            </Section>

            <Section style={cardStyle}>
              <Text style={styles.label}>Remaining</Text>

              <Text
                style={{
                  ...statValue,
                  color: "#34d399",
                }}
              >
                ₹{(data?.budgetAmount - data?.totalExpenses).toLocaleString()}
              </Text>
            </Section>

            <Text style={styles.footer}>
              FlowMint AI detected that your spending is approaching your
              monthly budget limit.
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }

  return null;
}

const styles = {
  body: {
    backgroundColor: "#020817",
    padding: "40px 0",
    fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif",
  },

  container: {
    backgroundColor: "#0f172a",
    maxWidth: "640px",
    margin: "0 auto",
    padding: "40px",
    borderRadius: "24px",
    border: "1px solid rgba(45,212,191,0.15)",
  },

  logo: {
    textAlign: "center",
    color: "#2dd4bf",
    fontSize: "36px",
    fontWeight: "800",
    marginBottom: "10px",
  },

  title: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: "28px",
    marginBottom: "30px",
  },

  alertTitle: {
    color: "#f59e0b",
    textAlign: "center",
    fontSize: "28px",
    marginBottom: "30px",
  },

  text: {
    color: "#cbd5e1",
    fontSize: "16px",
    lineHeight: "28px",
  },

  label: {
    color: "#94a3b8",
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    margin: 0,
  },

  section: {
    backgroundColor: "#112240",
    border: "1px solid rgba(45,212,191,0.15)",
    borderRadius: "16px",
    padding: "20px",
    marginTop: "20px",
  },

  sectionTitle: {
    color: "#2dd4bf",
    fontSize: "20px",
    marginBottom: "20px",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    padding: "10px 0",
  },

  category: {
    color: "#e2e8f0",
  },

  amount: {
    color: "#2dd4bf",
    fontWeight: "600",
  },

  insight: {
    color: "#cbd5e1",
    lineHeight: "28px",
  },

  alertBox: {
    background: "linear-gradient(135deg,#f59e0b,#f97316)",
    borderRadius: "20px",
    padding: "24px",
    textAlign: "center",
    margin: "24px 0",
  },

  alertValue: {
    fontSize: "42px",
    fontWeight: "800",
    color: "#ffffff",
    margin: 0,
  },

  alertText: {
    color: "#ffffff",
    fontSize: "16px",
    marginTop: "8px",
  },

  footer: {
    color: "#64748b",
    textAlign: "center",
    marginTop: "30px",
    fontSize: "14px",
  },
};
